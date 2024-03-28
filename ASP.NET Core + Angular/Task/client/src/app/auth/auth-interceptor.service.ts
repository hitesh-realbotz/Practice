import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { exhaustMap, take } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private accountService: AccountService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req.params.toString());
    return this.accountService.currentUser$.pipe(take(1), exhaustMap(user => {
      if (!!user || !!this.accountService.user) {
        const modifiedReq = this.getModifiedRequest(req, !!user ? user : this.accountService.user! );
        return next.handle(modifiedReq);

      } else {
        return next.handle(req);
      }

    }))
  }

  getModifiedRequest(req: HttpRequest<any>, user: User) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return modifiedReq;
  }
}

