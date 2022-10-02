import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { DialogAddBrandComponent } from '../dialog-add-brand/dialog-add-brand.component';
import { Brand } from '../models/brand/brand.model';
import {
  BrandState,
  DeleteBrand,
  DeleteBrandFailed,
  DeleteBrandSuccessful,
  LoadBrands,
} from '../stores/brand';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-listing-brand',
  templateUrl: './listing-brand.component.html',
  styleUrls: ['./listing-brand.component.scss'],
})
export class ListingBrandComponent implements OnInit {
  statuses = [
    { value: 1, viewValue: 'All' },
    { value: 2, viewValue: 'Last Updated' },
    { value: 3, viewValue: 'Brand Name' },
    { value: 4, viewValue: 'Number Models' },
  ];
  selectedStatus = this.statuses[0].value;
  searchForm = new FormControl('');
  brands: Brand[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  clickedDelete = false;

  constructor(
    private _dialogCtrl: MatDialog,
    private _store: Store,
    private _cdr: ChangeDetectorRef,
    private _actions: Actions,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((data) => {
        this._store.dispatch(new LoadBrands({name: data}));
      });
      
    this._store.dispatch(new LoadBrands({}));
    this._store.select(BrandState.getBrand).subscribe((data) => {
      if (!data) return;
      this.brands = data;
      this._cdr.markForCheck();
    });

    this._actions
      .pipe(
        ofActionSuccessful(DeleteBrandSuccessful),
        untilDestroyed(this),
        map(({ payload }: DeleteBrandSuccessful) => payload)
      )
      .subscribe((data) => {
        if (!data) return;
        this.clickedDelete = false;
        this._store.dispatch(new LoadBrands({}));
        this._cdr.markForCheck();
      });

    this._actions
      .pipe(
        ofActionSuccessful(DeleteBrandFailed),
        untilDestroyed(this),
        map(({ payload }: DeleteBrandFailed) => payload)
      )
      .subscribe((error) => {
        if (!error) return;
        this.clickedDelete = false;
        this.openSnackBar(error.detail);
        this._cdr.markForCheck();
      });
  }

  openDialogAddBrand(): void {
    this._dialogCtrl.open(DialogAddBrandComponent, {
      width: '100vw',
      maxWidth: '480px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'box-shadow-dialog',
    });
  }

  deleteCarBrand(id: string) {
    this.clickedDelete = true;
    this._store.dispatch(new DeleteBrand({ car_brand_id: id }));
  }

  openSnackBar(error: string) {
    this._snackBar.open(error, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
