import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VietnameseServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api/translates';
  constructor(private http: HttpClient) { }

  afterTranslate(value: any): any{
    return this.http.post(`${this.baseUrl}`, {search: value});
  }

}
