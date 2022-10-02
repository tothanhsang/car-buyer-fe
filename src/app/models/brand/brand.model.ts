export interface Brand {
  id: string;
  img_url: string;
  name: string;
  description: string;
  last_update: string;
  number_model: string;
  status: boolean;
}

export interface AddBrandParams {
  image: any;
  name: string;
  status: boolean;
  description: string;
}
