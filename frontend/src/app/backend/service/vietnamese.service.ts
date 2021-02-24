import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VietnameseService {
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

  getVietnamese(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/vietnamese/${id}`);
  }

  createVietnamese(vietnamese: object): Observable<object> {
    // @ts-ignore
    vietnamese.english = JSON.stringify(vietnamese.english) || [];
    // @ts-ignore
    vietnamese.type = JSON.stringify(vietnamese.type) || [];
    return this.http.post(environment.apiUrl + '/vietnamese', vietnamese, { headers: this.reqHeader });

  }

  updateVietnamese(id: number, value: any): Observable<object> {
    return this.http.put(environment.apiUrl + `/vietnamese/${id}`, value, { headers: this.reqHeader });
  }

  deleteVietnamese(id: number): Observable<any> {

    return this.http.delete(environment.apiUrl + `/vietnamese/${id}`, { headers: this.reqHeader });
  }

  // tslint:disable-next-line:typedef
  getVietnamesesList(): any{
    return this.http.get(environment.apiUrl + '/vietnamese');
  }

  getVietnamesesByName(name: string): Observable<any> {
    return this.http.post(environment.apiUrl + `/vietnamese/search/`, name);
  }
}
