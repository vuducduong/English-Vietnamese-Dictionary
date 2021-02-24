import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EnglishService {
  authToken!: any;
  reqHeader!: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.authToken = tokenStorage.getToken();
    console.log(this.authToken);
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      // cu phap co dau cach dang sau Bearer
      'Authorization': 'Bearer ' + this.authToken
    });
  }

  getEnglish(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/english/${id}`);
  }

  createEnglish(english: object): Observable<object> {
    // @ts-ignore
    english.vietnamese = JSON.stringify(english.vietnamese) || [];
    // @ts-ignore
    english.type = JSON.stringify(english.type) || [];
    return this.http.post(environment.apiUrl + '/english', english, { headers: this.reqHeader });
  }

  updateEnglish(id: number, value: any): Observable<object> {
    value.vietnamese = JSON.stringify(value.vietnamese) || [];
    value.type = JSON.stringify(value.type) || [];
    console.log(value);
    return this.http.put(environment.apiUrl + `/english/${id}`, value, { headers: this.reqHeader });
  }

  deleteEnglish(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `/english/${id}`, { headers: this.reqHeader });
  }

  getEnglishsList(): Observable<any> {
    return this.http.get(environment.apiUrl + '/english');
  }

  getEnglishsByName(name: string): Observable<any> {
    return this.http.post(environment.apiUrl + `/english/search/`, name);
  }
}
