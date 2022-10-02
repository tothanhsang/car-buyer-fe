import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BrandModel, initialState } from './state-models';
import {
  AddBrand,
  AddBrandFailed,
  AddBrandSuccessful,
  ClearBrandDetail,
  DeleteBrand,
  DeleteBrandFailed,
  DeleteBrandSuccessful,
  LoadBrandDetail,
  LoadBrands,
  UpdateBrand,
  UpdateBrandFailed,
  UpdateBrandSuccessful,
} from './actions';
import { catchError, tap } from 'rxjs/operators';
import { BrandService } from 'src/app/services/brand/brand.service';

@Injectable({ providedIn: 'root' })
@State<BrandModel>({
  name: 'brand',
  defaults: initialState,
})
export class BrandState {
  @Selector()
  static getBrand({ brandList }: BrandModel) {
    return brandList;
  }

  @Selector()
  static getBrandDetail({ brandDetail }: BrandModel) {
    return brandDetail;
  }

  constructor(private _brandService: BrandService) {}

  @Action(LoadBrands, { cancelUncompleted: true })
  loadBrands(
    { patchState }: StateContext<BrandModel>,
    { payload }: LoadBrands
  ) {
    return this._brandService.getCarBrands(payload.name).pipe(
      tap((data) => {
        patchState({
          brandList: data,
        });
      })
    );
  }

  @Action(LoadBrandDetail, { cancelUncompleted: true })
  loadBrandDetail(
    { patchState }: StateContext<BrandModel>,
    { payload }: LoadBrandDetail
  ) {
    return this._brandService.getCarBrandDetail(payload.id).pipe(
      tap((data) => {
        patchState({
          brandDetail: data,
        });
      })
    );
  }

  @Action(ClearBrandDetail, { cancelUncompleted: true })
  clearBrandDetail({ patchState }: StateContext<BrandModel>) {
    patchState({
      brandDetail: undefined,
    });
  }

  @Action(AddBrand, { cancelUncompleted: true })
  AddBrand({ dispatch }: StateContext<BrandModel>, { payload }: AddBrand) {
    return this._brandService.createCarBrand(payload).pipe(
      tap((result) => {
        if (result) return dispatch(new AddBrandSuccessful(result));
        return;
      }),
      catchError((err) => {
        return dispatch(new AddBrandFailed(err.error));
      })
    );
  }

  @Action(UpdateBrand, { cancelUncompleted: true })
  updateBrand(
    { dispatch }: StateContext<BrandModel>,
    { payload }: UpdateBrand
  ) {
    return this._brandService
      .updateCarBrand(payload.car_brand_id, payload.addBrandParams)
      .pipe(
        tap((result) => {
          if (result) return dispatch(new UpdateBrandSuccessful(result));
          return;
        }),
        catchError((err) => {
          return dispatch(new UpdateBrandFailed(err.error));
        })
      );
  }

  @Action(DeleteBrand, { cancelUncompleted: true })
  deleteBrands(
    { dispatch }: StateContext<BrandModel>,
    { payload }: DeleteBrand
  ) {
    return this._brandService.deleteCarBrand(payload.car_brand_id).pipe(
      tap((result) => {
        if (result) return dispatch(new DeleteBrandSuccessful(result));
        return;
      }),
      catchError((err) => {
        return dispatch(new DeleteBrandFailed(err.error));
      })
    );
  }
}
