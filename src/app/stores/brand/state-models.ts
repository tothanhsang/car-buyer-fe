import { Brand } from 'src/app/models/brand/brand.model';

export interface BrandModel {
  brandList?: Brand[];
}

export const initialState: BrandModel = {};
