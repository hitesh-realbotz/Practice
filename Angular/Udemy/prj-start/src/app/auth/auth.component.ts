import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  closeSub: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signup(email, password);

      // this.authService.signup(email, password).subscribe(
      //   resData => {
      //     console.log(resData);
      //     this.isLoading = false;
      //   },
      //   // // error resp display from component itself
      //   // errorRes => {
      //   //   console.log(errorRes);
      //   //   switch (errorRes.error.error.message) {
      //   //     case "EMAIL_EXISTS": 
      //   //       this.error = 'This email-Id already registered!'
      //   //       break;
      //   //     default:
      //   //       break;
      //   //   }
      //   //   // this.error = 'An Error Occured!'
      //   //   this.isLoading = false;
      //   // }

      //   // error resp display from auth.service
      //   errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // );
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  //Using ViewContainerRef - Dynamic creation
  showErrorAlert(message: string) {
    // const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    // const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }


}
