import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-brand',
  templateUrl: './dialog-add-brand.component.html',
  styleUrls: ['./dialog-add-brand.component.scss']
})
export class DialogAddBrandComponent implements OnInit {
  statuses= [
    {value: 'acitve', viewValue: 'Active'},
    {value: 'inactive', viewValue: 'Inactive'},
  ];
  selectedStatus = this.statuses[0].value;

  constructor(
    private _dialogRef: MatDialogRef<DialogAddBrandComponent>,
  ) { }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  createBrand() {
    
  }
}
