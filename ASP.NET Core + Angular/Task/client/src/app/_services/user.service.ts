import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private accountService: AccountService) { }

  updateProfile(model: any) {
    return this.http.post<User>(this.baseUrl + 'users/update', model).pipe(
      tap(response => {
        console.log("Serv update = " + response.twoFactorEnabled);
        console.log("Serv update = " + response);
        const user = response;
        if (user) {
          this.accountService.setCurrentUser(user);
        }
      })
    );
  }

  setMainPhoto(publicId: string) {
    // return this.http.put<User>(this.baseUrl + 'users/setmainphoto/'+ '?PublicId='+, { PublicId : publicId });
    return this.http.put<User>(this.baseUrl + 'users/set-main-photo/'+ '?publicId='+publicId, {});
  }

  deletePhoto(publicId: string) {
    return this.http.delete<User>(this.baseUrl + 'users/delete-photo'+ '?publicId='+publicId);
  }
}
