import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AddBrandParams, Brand } from '../models/brand/brand.model';
import {
  BrandState,
  ClearBrandDetail,
  LoadBrandDetail,
  UpdateBrand,
  UpdateBrandFailed,
  UpdateBrandSuccessful,
} from '../stores/brand';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss'],
})
export class BrandDetailComponent implements OnInit, OnDestroy {
  statuses = [
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'Inactive' },
  ];
  selectedStatus = this.statuses[0].value;
  addBrandForm!: FormGroup;
  fileName!: string;
  invalidFile = true;
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
  brandDetail!: Brand;
  idBrandDetail = this._router.url.split('/')[3];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store,
    private _actions: Actions,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      new LoadBrandDetail({ id: Number(this.idBrandDetail) })
    );
    this.addBrandForm = this._fb.group({
      image: [''],
      name: ['', Validators.required],
      status: [true, Validators.required],
      description: ['', Validators.required],
    });

    this._store.select(BrandState.getBrandDetail).subscribe((data) => {
      if (!data) return;
      this.brandDetail = data;
      this.addBrandForm.patchValue({
        name: this.brandDetail.name,
        status: this.brandDetail.status,
        description: this.brandDetail.name,
      });
      this._cdr.markForCheck();
    });

    this._actions
      .pipe(
        ofActionSuccessful(UpdateBrandSuccessful),
        untilDestroyed(this),
        map(({ payload }: UpdateBrandSuccessful) => payload)
      )
      .subscribe((data) => {
        if (!data) return;
        this._router.navigate(['/home'])
        this.isCallAPI = false;
        this._cdr.markForCheck();
      });

    this._actions
      .pipe(
        ofActionSuccessful(UpdateBrandFailed),
        untilDestroyed(this),
        map(({ payload }: UpdateBrandFailed) => payload)
      )
      .subscribe((error) => {
        if (!error) this.isCallAPI = false;
        this.openSnackBar(error.detail);
        this._cdr.markForCheck();
      });
  }
  onFileChange($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files.item(0);
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
    this._cdr.markForCheck();
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

  saveChange() {
    const addBrandFormValue = this.addBrandForm.value;
    if (this.addBrandForm.invalid) return;
    this.isCallAPI = true;
    const addBrandParams: AddBrandParams = {
      image: addBrandFormValue.image,
      name: addBrandFormValue.name,
      status: addBrandFormValue.status,
      description: addBrandFormValue.description,
    };
    this._store.dispatch(
      new UpdateBrand({
        car_brand_id: this.idBrandDetail,
        addBrandParams: addBrandParams,
      })
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(new ClearBrandDetail());
  }
}
