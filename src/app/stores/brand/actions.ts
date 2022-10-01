const enum Actions {
  LOAD_BRAND_LIST = '[Brand] Load Brand List',
}

export class LoadBrandList {
  static readonly type = Actions.LOAD_BRAND_LIST;
  constructor(
    public readonly payload: {
      name: string;
    }
  ) {}
}
