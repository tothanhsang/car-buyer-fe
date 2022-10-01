import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  brandListUrl = this.config.getConfig().brand.list;

  constructor(private config: ConfigService, private http: HttpClient) {}

  getBrandList(name: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('name', name);
    this.brandListUrl = 'http://127.0.0.1:8000/stores';
    // return this.http.get(`${this.brandListUrl}`, { params: httpParams });
    return this.http.get(`${this.brandListUrl}`);
  }
}
