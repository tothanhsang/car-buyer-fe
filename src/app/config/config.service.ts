import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl: any = {
    car_brands: `${environment.apiUrl}car-brands`,
  };

  getConfig() {
    return this.configUrl;
  }
}
