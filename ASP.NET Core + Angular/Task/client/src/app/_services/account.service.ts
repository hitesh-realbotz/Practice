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


  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      tap(response => {
        this.user = response ;
      })
    )
  }
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap(response => {
        if (response.twoFactorEnabled) {
          // this.setCurrentUser(response);
          // this.getCartServiceInstance();
          // this.cartService?.setCartItems(response.cart);
        }else{
          this.user = response ;
        }

      })
    )
  }
  autoLogin(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
        this.setCurrentUser(user);
        
  }
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
  setTwoFA(code: string) {
    // return this.http.post<User>(this.baseUrl + 'twoFactorAuthenticator/2fa-login', model).pipe(
    // return this.http.post<User>(this.baseUrl + 'account/setTwoFA?code='+code, {}).pipe(
    return this.http.post<User>(this.baseUrl + 'account/setTwoFA?code='+code, {}).pipe(
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
    return this.http.post<QRData>(this.baseUrl + 'account/getqr', {
      headers: new HttpHeaders({
        Authorization : 'Bearer '+this.user?.token
      })
    }).pipe(
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
