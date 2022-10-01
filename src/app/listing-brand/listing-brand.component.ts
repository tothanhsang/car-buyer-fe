import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBrandComponent } from '../dialog-add-brand/dialog-add-brand.component';

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
  ) { }

  ngOnInit(): void {
    // this.openDialogAddBrand();
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
