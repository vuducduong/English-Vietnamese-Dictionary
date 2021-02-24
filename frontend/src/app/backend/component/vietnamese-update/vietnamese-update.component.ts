import { Component, OnInit } from '@angular/core';
import {Vietnamese} from '../../service/vietnamese';
import {VietnameseService} from '../../service/vietnamese.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vietnamese-update',
  templateUrl: './vietnamese-update.component.html',
  styleUrls: ['./vietnamese-update.component.css']
})
export class VietnameseUpdateComponent implements OnInit {

  id!: number;
  vietnamese!: Vietnamese;

  constructor(private route: ActivatedRoute, private router: Router,
              private vietnameseService: VietnameseService) { }

  ngOnInit(): void {
    this.vietnamese = new Vietnamese();

    this.id = this.route.snapshot.params.id;

    this.vietnameseService.getVietnamese(this.id)
      .subscribe(data => {
        console.log(data);
        this.vietnamese = data;
      }, error => console.log(error));
  }

  updateEmployee(): void {
    this.vietnameseService.updateVietnamese(this.id, this.vietnamese)
      .subscribe(data => {
        console.log(data);
        this.vietnamese = new Vietnamese();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.updateEmployee();
  }

  gotoList(): void {
    this.router.navigate(['admin/vietnamese']);
  }
}
