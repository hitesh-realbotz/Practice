import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/_models/constants';
import { TwoFALogin } from 'src/app/_models/twoFALogin';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-otp-input-modal',
  templateUrl: './otp-input-modal.component.html',
  styleUrls: ['./otp-input-modal.component.css']
})
export class OtpInputModalComponent {
  @ViewChild('otpCode') otpCode: NgxOtpInputComponent | undefined;
  user!: User | null;
  code: string = '';
  isSubmitted: boolean = false;

  twoFAForm: FormGroup = new FormGroup({});

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: Constants.otpLength,
    autofocus: true
  };

  constructor(public bsModalRef: BsModalRef, private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router, private ngZone: NgZone) {
      this.user = this.accountService.user;
     }
 

  // enteredOTP(){
  //   for (const ele of this.otpCode?.ngxOtpArray.value) {
  //     this.code += ele;
  //   }
  // }

  //Onchange of entered OTP
  onOtpChange() {
    console.log(this.otpCode?.ngxOtpArray.value.join(''));
    this.code = this.otpCode?.ngxOtpArray.value.join('');
  }

  //To mark All form controls as Touched to display Validation messages on-submit button clicked
  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.twoFAForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

  onSubmit(event: Event) {
    console.log(this.code);
    if (this.code.length == this.otpInputConfig.otpLength) {
      let twoFAActionObservable: Observable<any>;
      if (!!this.user) {
        if (this.user.twoFactorEnabled) {
          twoFAActionObservable = this.accountService.verifyTwoFA(new TwoFALogin(this.user.email, this.code));
        } else {
          twoFAActionObservable = this.accountService.setTwoFA(new TwoFALogin(this.user.email, this.code));
        }
      } else {
        twoFAActionObservable = this.accountService.resetTwoFA(this.code);
      }

      twoFAActionObservable.subscribe({
        next: response => {
          if (!!this.user) {
            this.toastr.success('Welcome to bookStore', 'Login Success!');
            this.bsModalRef.hide();
          } else {
            this.toastr.success("Two FA Set!");
          }
          this.router.navigateByUrl('/book');
        }
      });
    }
    else {
      event.stopPropagation();
      this.markAllAsTouched();
      this.toastr.info("Enter OTP!!");
    }
    this.code = '';
    this.onClear();
  }
  
  //Exit from Form
  onClear() {
    this.otpCode?.clear();
  }
}
