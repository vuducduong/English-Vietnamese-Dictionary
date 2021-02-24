import {Component, OnInit} from '@angular/core';
import {Vietnamese} from '../../service/vietnamese';
import {VietnameseService} from '../../service/vietnamese.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {English} from '../../service/english';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {EnglishService} from '../../service/english.service';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-vietnamese-create',
  templateUrl: './vietnamese-create.component.html',
  styleUrls: ['./vietnamese-create.component.css']
})
export class VietnameseCreateComponent implements OnInit {

  vietnamese: Vietnamese = new Vietnamese();
  submitted = false;
  // tslint:disable-next-line:variable-name
  error_msg = '';
  showLoadingBar = false;
  englishs!: Observable<any>;
  // toppings = new FormControl();
  vietnameseForm!: FormGroup;
  public vietnameseFormAttempt: boolean;

  config: any = {
    height: 250,
    theme: 'modern',
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    templates: [
      {title: 'Test template 1', content: 'Test 1'},
      {title: 'Test template 2', content: 'Test 2'}
    ],
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tinymce.com/css/codepen.min.css'
    ]
  };
  description = '';
  typeList = [
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Preposition',
  ];

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private vietnameseService: VietnameseService,
              private router: Router,
              private toasrt: ToastrService,
              private englishService: EnglishService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private tokenstorage: TokenStorageService
  ) {
  }

  reset() {
    this.vietnameseForm.reset();
    this.vietnameseFormAttempt = false;
  }

  ngOnInit(): void {
    this.englishs = this.englishService.getEnglishsList();
    // console.log(this.vietnameses);
    this.vietnameseForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      spelling: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  newVietnamese(): void {
    this.submitted = false;
    this.vietnamese = new Vietnamese();
  }

  error(): void {
    this.toasrt.warning('Có lỗi xảy ra.', 'Your must enter all fields!', {
      progressAnimation: 'decreasing',
      timeOut: 3000
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  save(): void {
    // console.log(this.submitted);
    // console.log(this.english);
    // console.log(111);
    this.vietnamese = this.vietnameseForm.value;
    // console.log(this.englishForm);
    // this.english.vietnamese = this.toppings.value;
    this.vietnameseService
      .createVietnamese(this.vietnamese)
      .subscribe((data: any) => {
          if (data.status !== undefined && data.status !== 'undefined') {
            if (data.status.includes('Authorization Token not found')) {
              this.error_msg = 'Authorization Token not found';
            } else if (data.status.includes('Token is Invalid')) {
              this.error_msg = 'Token is Invalid';
            } else if (data.status.includes('oken is Expire')) {
              this.error_msg = 'Token is Expired';
            }
          }

          // console.log(this.error_msg);
          if (this.error_msg) {
            this.tokenstorage.signOut();
            this.toasrt.warning(this.error_msg, 'Error happing while adding!', {
              progressAnimation: 'decreasing',
              timeOut: 3000
            });
          } else {
            this.vietnamese = new Vietnamese();
            this.toasrt.success('Added successfully', 'Thêm thành công', {
              progressAnimation: 'decreasing',
              timeOut: 3000
            });
            this.showLoadingBar = true;
            setTimeout(() => {
              // this.router.navigate(['english']);
              this.gotoList();
            }, 2000);
          }
        },
        (error: any) => this.error());
  }

  onSubmit(): void {
    // console.log(this);
    this.vietnameseFormAttempt = true;
    this.submitted = true;
    this.save();
  }

  gotoList(): void {
    this.router.navigate(['admin/vietnamese/list']);
  }
}
