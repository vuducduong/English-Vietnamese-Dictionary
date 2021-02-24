import { Component, OnInit } from '@angular/core';
import {English} from '../../service/english';
import {ActivatedRoute, Router} from '@angular/router';
import {EnglishService} from '../../service/english.service';
import {VietnameseService} from '../../service/vietnamese.service';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-english-update',
  templateUrl: './english-update.component.html',
  styleUrls: ['./english-update.component.css']
})
export class EnglishUpdateComponent implements OnInit {

  id!: number;
  english!: English;
  vietnameses!: Observable<any>;
  typeList = [
    'Danh từ',
    'Động từ',
    'Tính từ',
    'Trạng từ',
    'Giới từ',
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private englishService: EnglishService,
              private vietnameseService: VietnameseService,
              private toasrt: ToastrService
  ) { }

  ngOnInit(): void {
    this.vietnameses = this.vietnameseService.getVietnamesesList();
    this.english = new English();

    this.id = this.route.snapshot.params.id;

    this.englishService.getEnglish(this.id)
      .subscribe(data => {
        console.log(data);
        this.english = data;
      }, error => console.log(error));
  }

  updateEnglish(): void {
    this.englishService.updateEnglish(this.id, this.english)
      .subscribe(data => {
        console.log(data);
        this.english = new English();
        this.toasrt.success('Edited successfully', 'Sửa thành công', {
          progressAnimation: 'decreasing',
          timeOut: 3000
        });
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.updateEnglish();
  }

  gotoList(): void {
    this.router.navigate(['/admin/english/list']);
  }
}
