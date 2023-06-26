import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericResponse} from '../model/generic-response';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = environment.token;
  apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  public generateToken(request: any): Observable<GenericResponse> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    console.log('Token from Headers --> ' + httpHeaders.get("Authorization"));
    return this.http.post<GenericResponse>(this.apiUrl + '/auth/token', request, {
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
  }
}
