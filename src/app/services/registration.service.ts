import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {GenericResponse} from "../model/generic-response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private token = environment.token;
  private baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  registerUser(request: any) {
    const httpHeaders = new HttpHeaders().set('Authorization', this.token);
    console.log('Token from Headers --> ' + httpHeaders.get("Authorization"));
    return this.http.post<GenericResponse>(this.baseUrl + '/user/register', request, {
      headers: httpHeaders,
      observe: 'response'
    })
      .pipe(
        map((response: HttpResponse<GenericResponse>) => {
          if (response.body === null) {
            console.log("ERROR OCCURRED!");
            throw new Error('Unexpected response: null');
          }
          return response.body;
        })
      );
  };
}
