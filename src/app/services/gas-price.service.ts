import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {GenericResponse} from "../model/generic-response";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {GasPriceData} from "../model/gas-price-data";
// import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class GasPriceService {

  apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getGasPrices(page: number, size: number) {
    const httpHeaders = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('session_x_token')}`);
    console.log('*** GasPriceService token *** ' + sessionStorage.getItem('session_x_token'));
    return this.http.get<GasPriceData>(this.apiUrl + '/gas-prices/' + page + '/' + size, {headers: httpHeaders, observe: 'response'})
      .pipe(
        map((response: HttpResponse<GasPriceData>) => {
          if (response.body === null) {
            console.log("ERROR OCCURRED!");
            throw new Error('Unexpected response: null');
          }
          return response.body;
        })
      );
  }
}

//   public getGasPrices(page: number, size: number) {
//     const httpHeaders = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('session_x_token')}`);
//     console.log('*** GasPriceService toKEN *** ' + sessionStorage.getItem('session_x_token'));
//     return this.http.get<GasPriceData>(this.apiUrl + '/gas-prices/' + page + '/' + size, {headers: httpHeaders, observe: 'response'})
//       .pipe(
//         map((response: HttpResponse<GasPriceData>) => {
//           if (response.body === null) {
//             console.log("ERROR OCCURRED!");
//             throw new Error('Unexpected response: null');
//           }
//           return response.body;
//         })
//       );
//   }
// }
