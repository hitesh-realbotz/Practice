import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
  isLoading: boolean = false;
  isLoginMode = true;
  error: string = null;
  role: string = 'buyer';
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    private userService: UserService) { }

  //Login & SignUp mode selection
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.toastr.info(this.isLoginMode ? `Switched To Login Mode` : `Switched To SignUp Mode`);
  }

  //Displays ForgotPAssword From
  onForgotPass() {
    this.router.navigate(['auth/forgotpass']);
    // this.router.navigate(['forgotpass'], { relativeTo: this.route });
  }


  //Process User email => Displays User Security Question => Vlidates Answer in steps
  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let isSignUp = false;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      isSignUp = true;
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log('resData');
        console.log(isSignUp);
        console.log(resData);
        this.isLoading = false;
        this.toastr.success('Welcome to E-Shop', 'Login Success!');
        // this.router.navigate(['user']);
        if (isSignUp) {
          this.router.navigate(['/user/profile']);
        } else {
          this.router.navigate(['/items']);
        }
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        if (isSignUp) {
          this.toastr.warning('User Already Registered!!');
        } else {
          this.toastr.warning('Enter Valid Credentials', 'Login Unsuccessful!');
        }
        
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

}
