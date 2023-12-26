import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  error: string = null;
  isUser: boolean = false;
  userForm: FormGroup;
  validUser: User;
  email: string;
  question: string;
  answer: string;
  formMode: string = 'emailCheck';
  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.forgotPassForm();
  }

  forgotPassForm() {
    console.log('ForgotPass Init');
    this.userForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'question': new FormControl(this.question, [Validators.required, this.checkQuestion.bind(this)]),
      'answer': new FormControl('', [Validators.required, this.checkWhiteSpace.bind(this)]),
      'password': new FormControl(''),
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } {   
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }
  checkQuestion(control: FormControl): { [s: string]: boolean } {
    if (control.value == 'Choose Security Question for Password Reset') {
      return { 'checkQuestion': true };
    }
    return null;
  }

  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

  onSubmit(event: Event) {
    console.log(this.userForm.valid);
    
      if (this.formMode == 'emailCheck') {
        let email = this.userForm.value['email'];
        this.validUser = this.authService.forgotPass(email);
        console.log('Quest : ', this.validUser);
        if (!!this.validUser && this.validUser.question != '') {
          if (this.validUser.question != '') {
            this.isUser = true;
            this.formMode = 'answerCheck';
            this.email = this.validUser.email;
            this.question = this.validUser.question;
            this.forgotPassForm();
            this.toastr.info('Verify Security Question', 'Security Question!!');
          } else {
            this.toastr.warning('Security Question not set', 'Security Question!!');
            console.log('Question not set');
          }
  
        } else {
          this.toastr.warning('User Not Registered!!');
  
        }
      } else if (this.formMode == 'answerCheck') {
        this.answer = this.userForm.value['answer'];
        if (this.answer === this.validUser.answer) {
          this.formMode = 'enterPassword';
          this.toastr.info('Answer Matched', 'Answer Status!');
          console.log(this.validUser);
          this.forgotPassForm();
        } else {
          this.toastr.warning('Answer Not Matched', 'Answer Status!');
        }
      } else {
        let newPassword = this.userForm.value['password'];
        let passObs: Observable<AuthResponseData>;
        passObs = this.authService.resetPass(this.validUser, newPassword);
        // passObs = this.authService.upPassValuesDirect(this.validUser._token, this.validUser, newPassword) // not working as user not logged-in
        passObs.subscribe(
          resData => {
  
            this.toastr.info('Password Changed!!');
            // this.router.navigate(['/items']); 
            this.authService.logout();
          },
          errorMessage => {
            console.log(errorMessage);
            this.toastr.warning('Password not Changed!!');
            // this.router.navigate(['/auth']); 
            this.authService.logout();
          }
        );
      }
      
    

    
  }
}
