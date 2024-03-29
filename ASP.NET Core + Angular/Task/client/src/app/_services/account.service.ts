import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QRData } from '../_models/qrdata';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  public currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  user!: User | null;
  private cartService: CartService | undefined;
  constructor(private http: HttpClient, private injector: Injector) { }


  //Register & Navigate to set 2FA
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      tap(response => {
        this.user = response;
      })
    )
  }


  //Check login credentials & Navigate to enter 2FA code if 2FA enabled else ask to setup of 2FA
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap(response => {
        if (response.twoFactorEnabled) {
          // this.setCurrentUser(response);
          // this.getCartServiceInstance();
          // this.cartService?.setCartItems(response.cart);
        } else {
          this.user = response;
        }

      })
    )
  }

  //AutoLogin incase of page refresh
  autoLogin() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.setCurrentUser(user);
  }

  //Verify 2FA code & allow login
  verifyTwoFA(model: any) {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    return this.http.post<User>(this.baseUrl + 'account/two-fa-login', model).pipe(
      tap(response => {
        if (response) {
          this.setCurrentUser(response);
          this.getCartServiceInstance();
          this.cartService?.setCartItems(response.cart);
        }
      })
    )
  }

  //Sets 2FA
  setTwoFA(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/setTwoFA', model).pipe(
      tap(response => {
        console.log("Serv set = " + response.twoFactorEnabled);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  //Resets 2FA
  resetTwoFA(code: string) {
    return this.http.post<User>(this.baseUrl + 'account/resetTwoFA?code=' + code, {}).pipe(
      tap(response => {
        console.log("Serv set = " + response.twoFactorEnabled);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  //Resets AuthenticatorKey & gets QRCode data
  getQR() {
    return this.http.post<QRData>(this.baseUrl + 'account/getqr', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.user?.token
      })
    }).pipe(
      tap(response => {
        console.log("Serv GetQR = " + response.authenticatorUri);
      })
    )
  }

  //Sets currentUser
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  //LogOut
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }

  //gets cartService instance
  getCartServiceInstance(): CartService {
    if (!this.cartService) {
      this.cartService = this.injector.get(CartService);
    }
    return this.cartService;
  }
}
