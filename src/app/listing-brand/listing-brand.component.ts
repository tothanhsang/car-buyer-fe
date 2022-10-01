import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Store } from '@ngxs/store';
import { DialogAddBrandComponent } from '../dialog-add-brand/dialog-add-brand.component';
import { BrandState, LoadBrandList } from '../stores/brand';

@Component({
  selector: 'app-listing-brand',
  templateUrl: './listing-brand.component.html',
  styleUrls: ['./listing-brand.component.scss']
})
export class ListingBrandComponent implements OnInit {
  statuses = [
    { value: 'acitve', viewValue: 'All' },
    { value: 'inactive', viewValue: 'Last Updated' },
    { value: 'inactive', viewValue: 'Brand Name' },
    { value: 'inactive', viewValue: 'Brand Name' },
    { value: 'inactive', viewValue: 'Number Models' },
  ];
  selectedStatus = this.statuses[0].value;


  constructor(
    private _dialogCtrl: MatDialog,
    private _actions: Actions,
    private _store: Store,
  ) { }

  ngOnInit(): void {
    // this.openDialogAddBrand();
    this._store.dispatch(
      new LoadBrandList({ name: '1233' })
    );

    this._store
      .select(BrandState.getBrand)
      .subscribe((data) => {
        if (!data) return;
        console.log("data: ", data);
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

}
