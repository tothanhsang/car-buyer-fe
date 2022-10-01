import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl: any = {
    brand: {
      list: '',
    },
  };

  getConfig() {
    return this.configUrl;
  }
}
