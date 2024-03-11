import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QRData } from '../_models/qrdata';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient,) { }


  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      tap(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  verifyTwoFA(model: any) {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    return this.http.post<User>(this.baseUrl + 'account/verify', model).pipe(
      tap(response => {
        console.log("Serv Verfiy = "+response.isTwoFAEnabled);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  setTwoFA(model: any) {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    return this.http.post<User>(this.baseUrl + 'account/setTwoFA', model).pipe(
      tap(response => {
        console.log("Serv set = "+response.isTwoFAEnabled);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  getQR() {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    return this.http.post<QRData>(this.baseUrl + 'account/getqr', {}).pipe(
      tap(response => {
        console.log("Serv GetQR = "+response.authenticatorUri);
        
      })
    )
  }

  setCurrentUser(user: User) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    console.log('from serv = ' + user);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);

  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }


}
