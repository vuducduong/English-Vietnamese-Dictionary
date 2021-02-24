import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from "rxjs/operators";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit {
  title = "cloudsSorage";
  selectedFile: File = null;
  fileToUpload: File = null;
  fb: string;
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;
  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  files: File[] = [];

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  handleFileInput($event: any) {
    this.fileToUpload = $event.target.files[0];
    console.log(this.fileToUpload);
    if (this.fileToUpload.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
    }
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  reset() {
    location.reload();
  }

  UploadFile() {
    var n = Date.now();
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    // Totally optional metadata
    const customMetadata = {app: 'My AngularFire-powered PWA!'};
    this.task = this.storage.upload(filePath, this.fileToUpload, {customMetadata});
    console.log(this.task);

    // observe percentage changes
    this.uploadPercent = this.task.percentageChanges();
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges()

    // get notified when the download URL is available
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            // console.log(1111);
          });
        }),
        tap(snap => {
          console.log(snap)
          if (snap.bytesTransferred === snap.totalBytes) {
            // Update firestore on completion
            this.db.collection('photos').add({filePath, size: snap.totalBytes})
          }
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      // return;
    }
    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = {app: 'My AngularFire-powered PWA!'};
    // The main task
    this.task = this.storage.upload(path, file, {customMetadata});
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(() => this.downloadURL = fileRef.getDownloadURL()),
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add({path, size: snap.totalBytes})
        }
      })
    )
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

}
