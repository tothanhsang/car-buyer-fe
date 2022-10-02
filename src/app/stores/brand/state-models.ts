import { Brand } from 'src/app/models/brand/brand.model';

export interface BrandModel {
  brandList?: Brand[];
  brandDetail?: Brand;
}

export const initialState: BrandModel = {};
