import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
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

  private cartService: CartService | undefined;
  constructor(private http: HttpClient, private injector: Injector) { }


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
          this.getCartServiceInstance();
          this.cartService?.setCartItems(user.cart);
        }
      })
    )
  }
  verifyTwoFA(model: any) {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    return this.http.post<User>(this.baseUrl + 'account/verify', model).pipe(
      tap(response => {
        console.log("Serv Verfiy = " + response.twoFactorEnabled);
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
        console.log("Serv set = " + response.twoFactorEnabled);
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  // updateProfile(model: any) {
  //   return this.http.post<User>(this.baseUrl + 'account/update', model).pipe(
  //     tap(response => {
  //       console.log("Serv update = " + response.twoFactorEnabled);
  //       console.log("Serv update = " + response);
  //       const user = response;
  //       if (user) {
  //         this.setCurrentUser(user);
  //       }
  //     })
  //   );
  // }

  getQR() {
    return this.http.post<QRData>(this.baseUrl + 'account/getqr', {}).pipe(
      tap(response => {
        console.log("Serv GetQR = " + response.authenticatorUri);

      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);

  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }

  getCartServiceInstance(): CartService {
    if (!this.cartService) {
        this.cartService = this.injector.get(CartService);
    }
    return this.cartService;
}


}
