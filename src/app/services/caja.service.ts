import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';
import { Caja, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  http = inject(HttpClient);
  authService = inject(AuthService);
  utilsSvc = inject(UtilsService);

  private readonly baseUrl: string = environment.baseUrl;
  private hoy: string = moment().utc(true).format("DD/MM/YYYY")

  constructor() { }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  getCaja(){

    const cajaActual = this.user().ruta.caja_actual;

    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${this.user().token}`);

    return this.http.get<Caja>(`${this.baseUrl}/caja/${cajaActual}`, { headers })

  }

  closeRuta() {

    let ruta = this.user().ruta._id;
    const url = `${this.baseUrl}/ruta/close/${ruta}`;

    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${this.user().token}`);

    return this.http.patch<boolean>(url, {}, { headers });
  }

}
