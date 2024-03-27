import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                    this.toastr.error(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else {
                if (error.error.message.length > 0) {
                  this.toastr.error(error.error.message);
                }
              }
              break;
            case 401:
              this.toastr.error(
                'Unauthorised : ' + error.error.message,
                error.status
              );
              break;
            case 404:
              this.router.navigateByUrl('/error/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl(
                '/error/server-error',
                navigationExtras
              );
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      })
    );
  }
}
