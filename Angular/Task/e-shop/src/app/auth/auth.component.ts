import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoading: boolean = false;
  isLoginMode = true;
  error: string = null;
  role: string = 'buyer';
  closeSub: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.toastr.info(this.isLoginMode ? `Switched To Login Mode` : `Switched To SignUp Mode`);
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
      // authObs = this.authService.login(email, password, this.role);

    } else {
      authObs = this.authService.signup(email, password, this.role);

    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.toastr.success('Welcome to E-Shop', 'Login Success!');
        this.router.navigate(['/items']);

      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        this.toastr.warning('Enter Valid Credentials', 'Login Unsuccessful!');
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

}
