import { AddBrandParams } from 'src/app/models/brand/brand.model';

const enum Actions {
  LOAD_BRANDS = '[Brand] Load Brand List',
  LOAD_BRAND_DETAIL = '[Brand] Load Brand Detail',
  CLEAR_BRAND_DETAIL = '[Brand] Clear Brand Detail',
  ADD_BRAND = '[Brand] Add Brand',
  ADD_BRAND_SUCCESSFUL = '[Brand] Add Brand Successful',
  ADD_BRAND_FAIL = '[Brand] Add Brand Fail',
  UPDATE_BRAND = '[Brand] Update Brand',
  UPDATE_BRAND_SUCCESSFUL = '[Brand] Update Brand Successful',
  UPDATE_BRAND_FAIL = '[Brand] Update Brand Fail',
  DELETE_BRAND = '[Brand] Delete Brand',
  DELETE_BRAND_SUCCESSFUL = '[Brand] Delete Brand Successful',
  DELETE_BRAND_FAIL = '[Brand] Delete Brand Fail',
}

export class LoadBrands {
  static readonly type = Actions.LOAD_BRANDS;
  constructor(
    public readonly payload: {
      name?: string;
    }
  ) {}
}

export class LoadBrandDetail {
  static readonly type = Actions.LOAD_BRAND_DETAIL;
  constructor(
    public readonly payload: {
      id: number;
    }
  ) {}
}

export class ClearBrandDetail {
  static readonly type = Actions.CLEAR_BRAND_DETAIL;
}

export class AddBrand {
  static readonly type = Actions.ADD_BRAND;
  constructor(public readonly payload: AddBrandParams) {}
}

export class AddBrandSuccessful {
  static readonly type = Actions.ADD_BRAND_SUCCESSFUL;
  constructor(public readonly payload: any) {}
}

export class AddBrandFailed {
  static readonly type = Actions.ADD_BRAND_FAIL;
  constructor(public readonly payload: any) {}
}

export class UpdateBrand {
  static readonly type = Actions.UPDATE_BRAND;
  constructor(
    public readonly payload: {
      car_brand_id: string;
      addBrandParams: AddBrandParams;
    }
  ) {}
}

export class UpdateBrandSuccessful {
  static readonly type = Actions.UPDATE_BRAND_SUCCESSFUL;
  constructor(public readonly payload: any) {}
}

export class UpdateBrandFailed {
  static readonly type = Actions.UPDATE_BRAND_FAIL;
  constructor(public readonly payload: any) {}
}

export class DeleteBrand {
  static readonly type = Actions.DELETE_BRAND;
  constructor(
    public readonly payload: {
      car_brand_id: string;
    }
  ) {}
}

export class DeleteBrandSuccessful {
  static readonly type = Actions.ADD_BRAND_SUCCESSFUL;
  constructor(public readonly payload: any) {}
}

export class DeleteBrandFailed {
  static readonly type = Actions.ADD_BRAND_FAIL;
  constructor(public readonly payload: any) {}
}
