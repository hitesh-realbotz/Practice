import { Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_models/constants';
import { TwoFALogin } from 'src/app/_models/twoFALogin';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-otp-input-modal',
  templateUrl: './otp-input-modal.component.html',
  styleUrls: ['./otp-input-modal.component.css']
})
export class OtpInputModalComponent  {
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
    private router: Router, private ngZone: NgZone) { }

  enteredOTP(){
    for (const ele of this.otpCode?.ngxOtpArray.value) {
      this.code += ele;
    }
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
      this.accountService.verifyTwoFA(new TwoFALogin(this.user? this.user.email : '', this.code)).subscribe({
        next: response => {                 
          this.toastr.success('Welcome to bookStore', 'Login Success!');
          if (!response.twoFactorEnabled) {
            this.router.navigate(['/user/profile']);           
          } else {
            this.router.navigateByUrl('/book');
          }
          this.bsModalRef.hide();
          // this.router.navigate(['/user/profile']);
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
