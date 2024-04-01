import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { tap } from 'rxjs';
import { UserDashboardStat } from '../_models/userDashboardStat';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private accountService: AccountService) { }

  //Updates profile
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

  //Set main photo
  setMainPhoto(publicId: string) {
    // return this.http.put<User>(this.baseUrl + 'users/setmainphoto/'+ '?PublicId='+, { PublicId : publicId });
    return this.http.put<User>(this.baseUrl + 'users/set-main-photo/'+ '?publicId='+publicId, {});
  }

  //Delete photo
  deletePhoto(publicId: string) {
    return this.http.delete<User>(this.baseUrl + 'users/delete-photo'+ '?publicId='+publicId);
  }

  //Get cartItemCount & OrderCount
  getUserDashboardStat() {
    return this.http.get<UserDashboardStat>(this.baseUrl + 'users');
  }

}
