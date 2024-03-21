import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Subscription, take } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit, OnDestroy {
  @Input() user: User | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  componentSubscriptions = new Subscription();


  constructor(private accountService: AccountService, private userService: UserService,  private subService: SubscriptionsService) {

  }
  ngOnInit(): void {
    this.componentSubscriptions.add(this.subService.getLoggedUserChanges().subscribe({
      next: user => {
        if (user) this.user = user
      }
    }));
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/addphoto',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 5 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.user?.photos.push(photo);
        if (photo.isMain && this.user) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(photo.publicId).subscribe({
      next: user => {
        if (this.user) {
          console.log(photo.url);
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
          // this.user.photos.forEach(p => {
          //   if (p.isMain) console.log(p.url);
          //   // if (p.publicId === photo.publicId) p.isMain = true;
          // })
        }
      }
    })
  }

  deletePhoto(photo: Photo) {
    this.userService.deletePhoto(photo.publicId).subscribe({
      next: user => {
        if (this.user) {
          this.accountService.setCurrentUser(user);
          // this.user.photos = this.member?.photos.filter(x => x.id !== photoId)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }

}
