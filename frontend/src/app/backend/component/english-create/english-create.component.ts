import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EnglishService} from '../../service/english.service';
import {English} from '../../service/english';
import {Observable} from 'rxjs';
import {VietnameseService} from '../../service/vietnamese.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-english-create',
  templateUrl: './english-create.component.html',
  styleUrls: ['./english-create.component.css']
})
export class EnglishCreateComponent implements OnInit {

  english: English = new English();
  submitted = false;
  // tslint:disable-next-line:variable-name
  error_msg = '';
  showLoadingBar = false;
  vietnameses!: Observable<any>;
  // toppings = new FormControl();
  englishForm!: FormGroup;
  public englishFormAttempt: boolean;

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
    'Danh từ',
    'Động từ',
    'Tính từ',
    'Trạng từ',
    'Giới từ',
  ];

  constructor(private EnglishService: EnglishService,
              private router: Router,
              private toasrt: ToastrService,
              private vietnameseService: VietnameseService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private tokenstorage: TokenStorageService
  ) {
  }

  reset() {
    this.englishForm.reset();
    this.englishFormAttempt = false;
  }

  ngOnInit(): void {
    this.vietnameses = this.vietnameseService.getVietnamesesList();
    // console.log(this.vietnameses);
    this.englishForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      vietnamese: ['', [Validators.required]],
      spelling: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  newEnglish(): void {
    this.submitted = false;
    this.english = new English();
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
    this.english = this.englishForm.value;
    // this.english.vietnamese = this.toppings.value;
    const subscription = this.EnglishService
      .createEnglish(this.english)
      .subscribe((data: any) => {
          console.log("next");
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
            this.english = new English();
            this.toasrt.success('Added successfully', 'Thêm thành công', {
              progressAnimation: 'decreasing',
              timeOut: 3000
            });
            console.log(2222);
            this.showLoadingBar = true;
            setTimeout(() => {
              // this.router.navigate(['english']);
              this.gotoList();
            }, 2000);
            console.log(44444);
          }
        },
        (error: any) => this.error(), () => {
          console.log('Done');
          console.log(this);
        }
      );
  }

  onSubmit(): void {
    // console.log(this);
    this.englishFormAttempt = true;
    this.submitted = true;
    this.save();
  }

  gotoList(): void {
    this.router.navigate(['admin/english/list']);
  }
}
