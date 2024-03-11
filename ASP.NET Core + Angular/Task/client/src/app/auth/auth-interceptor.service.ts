import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private accountService: AccountService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.accountService.currentUser$.pipe(take(1), exhaustMap(user => {
          if (!user) {
              return next.handle(req);
          }
          const modifiedReq = req.clone({
              // params: new HttpParams().set('auth', user.token)
              setHeaders: {
                Authorization: `Bearer ${user.token}`
              }
          });
          return next.handle(modifiedReq);
      }))
  }
}