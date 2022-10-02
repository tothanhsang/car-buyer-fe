import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AddBrandParams } from '../models/brand/brand.model';
import {
  AddBrand,
  AddBrandFailed,
  AddBrandSuccessful,
  LoadBrands,
} from '../stores/brand';

@UntilDestroy()
@Component({
  selector: 'app-dialog-add-brand',
  templateUrl: './dialog-add-brand.component.html',
  styleUrls: ['./dialog-add-brand.component.scss'],
})
export class DialogAddBrandComponent implements OnInit {
  statuses = [
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'Inactive' },
  ];
  selectedStatus = this.statuses[0].value;
  addBrandForm!: FormGroup;
  fileName!: string;
  fieldIsRequired = false;
  invalidFile = false;
  TYPE_FILE_ACCEPTED = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
  ];
  LIMIT_SIZE_FILE = 4 * 1024 * 1024;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isCallAPI = false;

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _actions: Actions,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef,
    private _dialogRef: MatDialogRef<DialogAddBrandComponent>
  ) {}

  ngOnInit(): void {
    this.addBrandForm = this._fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
      description: ['', Validators.required],
    });

    this._actions
      .pipe(
        ofActionSuccessful(AddBrandSuccessful),
        untilDestroyed(this),
        map(({ payload }: AddBrandSuccessful) => payload)
      )
      .subscribe((data) => {
        if (!data) return;
        this._store.dispatch(new LoadBrands({}));
        this.closeDialog();
        this.isCallAPI = false;
        this._cdr.markForCheck();
      });

    this._actions
      .pipe(
        ofActionSuccessful(AddBrandFailed),
        untilDestroyed(this),
        map(({ payload }: AddBrandFailed) => payload)
      )
      .subscribe((error) => {
        if (!error) this.isCallAPI = false;
        this.openSnackBar(error.detail);
        this._cdr.markForCheck();
      });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onFileChange($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files.item(0);
      this.fieldIsRequired = false;
      this.fileName = file.name;
      if (
        !this.TYPE_FILE_ACCEPTED.includes(file.type) ||
        file.size > this.LIMIT_SIZE_FILE
      ) {
        this.invalidFile = true;
      } else {
        this.addBrandForm.patchValue({
          image: file,
        });
        this.invalidFile = false;
      }
    }
  }

  removeFile() {
    this.addBrandForm.controls['image'].setValue('');
    this.addBrandForm.controls['image'].setErrors(null);
    this.fileName = '';
    this.invalidFile = false;
    this._cdr.markForCheck();
  }

  openSnackBar(error: string) {
    this._snackBar.open(error, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  addBrand() {
    const addBrandFormValue = this.addBrandForm.value;
    if (!addBrandFormValue.image) {
      this.addBrandForm.controls['image'].setErrors({ required: true });
    }
    if (!this.fileName) {
      this.fieldIsRequired = true;
    } else if (!this.invalidFile && this.addBrandForm.valid) {
      this.fieldIsRequired = false;
      this.isCallAPI = true;
      const addBrandParams: AddBrandParams = {
        image: addBrandFormValue.image,
        name: addBrandFormValue.name,
        status: addBrandFormValue.status,
        description: addBrandFormValue.description,
      };
      this._store.dispatch(new AddBrand(addBrandParams));
    }
  }
}
