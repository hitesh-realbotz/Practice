import { NgModule } from '@angular/core';
import { AccountService } from './_services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ErrorInterceptor } from './_interceptors/error.interceptor';



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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
