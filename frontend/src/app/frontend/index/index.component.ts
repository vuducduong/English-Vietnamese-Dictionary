import {Component, OnInit} from '@angular/core';
import {VietnameseServiceService} from '../vietnamese-service.service';
import {EnglishService} from "../service/english.service";
import {Observable, Subject} from "rxjs";
import {concatMap, distinctUntilChanged, switchMap, throttleTime} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  en = '';
  vi = '';
  // showResult = true;
 searches!: any ;
  english!: any;
  enableEn = false;
  enableVi = false;
  data!: any;
  vnlist!: any;
  textareaValue = '';
  nodata = '';
  word = '';
  search$ = new Subject<string>();
  searchResult$: Observable<any>;
  constructor(private vietnameseServiceService: VietnameseServiceService,
              private englishServiceTranlsate: EnglishService,
              private http: HttpClient
  ) {}

  ngOnInit(): any {
    this.search$.pipe(
      throttleTime(300),
      distinctUntilChanged(),
      concatMap(value => {
      //switchMap(value => {
        this.word = value;
        return this.http.post(environment.apiUrl + '/translate', {word: value}) || [];
      })
    ).subscribe(
      (next) => {
        this.vnlist = next || [];
        this.enableEn = true;
        console.log(next);
        // console.log(JSON.parse(this.vnlist));
      });
  }

  getValueEnglish(word: any): any {
    this.textareaValue = word.target.value;
    console.log(this.textareaValue);
    console.log(this.en);
    this.vnlist = this.englishServiceTranlsate.tranlsateEnglish(this.textareaValue);
    this.enableEn = true;
    console.log(this.vnlist);
  }
  onInput(event): any{
  this.searches = event.target.value;
  this.loadData();
  }

  json2array(json) {
    return Object.keys(json).map((key) => [key, json[key]]);
  }

  loadData(): any
  {
    this.vietnameseServiceService.afterTranslate(this.searches).subscribe(
      data => {
        this.english = data;
        console.log(this.english)
      },
      error => {
        console.log(error);
      }
    );
  }

  getValueVietnamese($event: Event) {

  }
}


