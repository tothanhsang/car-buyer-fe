import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BrandModel, initialState } from './state-models';
import { LoadBrandList } from './actions';
import { tap } from 'rxjs/operators';
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

  constructor(private _brandService: BrandService) {}

  @Action(LoadBrandList, { cancelUncompleted: true })
  loadBrandList(
    { patchState }: StateContext<BrandModel>,
    { payload }: LoadBrandList
  ) {
    return this._brandService.getBrandList(payload.name).pipe(
      tap((data) => {
        patchState({
          brandList: data,
        });
      })
    );
  }
}
