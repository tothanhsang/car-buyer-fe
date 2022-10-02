import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBrandParams, Brand } from 'src/app/models/brand/brand.model';
import { ConfigService } from '../../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  brandListUrl = this.config.getConfig().car_brands;

  constructor(private config: ConfigService, private _http: HttpClient) {}

  getCarBrands(name: string | undefined): Observable<any> {
    if (name) {
      let httpParams = new HttpParams();
      httpParams = httpParams.append('name', name);
      return this._http.get(`${this.brandListUrl}`, { params: httpParams });
    } else {
      return this._http.get(`${this.brandListUrl}`);
    }
  }

  getCarBrandDetail(id: number): Observable<any> {
    return this._http.get(`${this.brandListUrl}/${id}`);
  }

  createCarBrand(addBrandParams: AddBrandParams): Observable<Brand[]> {
    const formData: any = new FormData();
    formData.append('img_file', addBrandParams.image);
    formData.append('name', addBrandParams.name);
    formData.append('status', addBrandParams.status);
    formData.append('description', addBrandParams.description);
    formData.append('last_update', '2022-01-01');
    formData.append('number_model', 0);
    return this._http.post<Brand[]>(`${this.brandListUrl}`, formData);
  }

  updateCarBrand(
    car_brand_id: string,
    addBrandParams: AddBrandParams
  ): Observable<Brand[]> {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log("dateStr: ",dateStr);
    const formData: any = new FormData();
    formData.append('img_file', addBrandParams.image);
    formData.append('name', addBrandParams.name);
    formData.append('status', addBrandParams.status);
    formData.append('description', addBrandParams.description);
    formData.append('last_update', dateStr);
    formData.append('number_model', 0);
    return this._http.put<Brand[]>(
      `${this.brandListUrl}/${car_brand_id}`,
      formData
    );
  }

  deleteCarBrand(car_brand_id: string): Observable<any> {
    return this._http.delete(`${this.brandListUrl}/${car_brand_id}`);
  }
}
