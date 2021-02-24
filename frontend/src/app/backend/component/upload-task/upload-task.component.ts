import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {FileSizePipe} from "../../../file-size.pipe";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<any>;
  fb: string;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              public FSP: FileSizePipe,
              private toasrt: ToastrService
  ) {
  }

  ngOnInit() {
    this.startUpload();
  }

  reset() {
    location.reload();
  }

  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = {app: 'My AngularFire-powered PWA!'};
    // The main task
    this.task = this.storage.upload(path, this.file, {customMetadata});
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot =
      this.task
        .snapshotChanges()
        .pipe(
          // tap(console.log),
          // The file's download URL
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            console.log(this.downloadURL);
            this.downloadURL.subscribe(url => {
              if (url) {
                this.toasrt.success('Uploaded successfully', 'Tải lên thành công');
                this.fb = url;
              }
              // console.log(this.fb);
              // console.log(1111);
            });
          }),
          tap(snap => {
            // console.log(snap)
            if (snap.bytesTransferred === snap.totalBytes) {
              // Update firestore on completion
              this.toasrt.success('Thêm vào collection');
              this.db.collection('photos').add({path, size: snap.totalBytes})
            }
          })
        );
  }

  startUpload2() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = {app: 'My AngularFire-powered PWA!'};
    // The main task
    this.task = this.storage.upload(path, this.file, {customMetadata});
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot =
      this.task
        .snapshotChanges()
        .pipe(
          tap(console.log),
          // The file's download URL
          finalize(async () => {
            this.downloadURL = await ref.getDownloadURL().toPromise();
            await this.db.collection('files').add({downloadURL: this.downloadURL, path});
          }),
        );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
