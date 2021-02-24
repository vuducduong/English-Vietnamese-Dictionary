import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../backend/service/token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnglishService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  tranlsateEnglish(english_word: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/translate', {word: english_word});
  }
}
