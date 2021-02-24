import { Component } from '@angular/core';
import {FileSizePipe} from "../../../file-size.pipe";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  constructor(private FSP: FileSizePipe,
              private toastr: ToastrService
  ) {
  }

  isHovering: boolean;

  files: File[] = [];
  mapped: { size: string; name: string; type: string }[];

  // tslint:disable-next-line:typedef
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // tslint:disable-next-line:typedef
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    console.log(this.files);
    this.mapped = this.files.map(file => {
      // console.log(file.name);
      // console.log(file);
      // console.log(this.FSP.transform(file.size));
      return {
        name: file.name,
        type: file.type,
        size: this.FSP.transform(file.size)
      };
    });
  }
}
