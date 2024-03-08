import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './_services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';



@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ],
  providers: [
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
