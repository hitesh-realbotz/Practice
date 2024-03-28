import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/_models/constants';
import { QRData, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-two-fa-setup',
  templateUrl: './two-fa-setup.component.html',
  styleUrls: ['./two-fa-setup.component.css']
})
export class TwoFaSetupComponent implements OnInit {
  user: User | undefined;
  @ViewChild('otpCode') otpCode: NgxOtpInputComponent | undefined;
  code: string = '';
  qrData: QRData = {} as QRData;
  twoFAForm: FormGroup = new FormGroup({});
  componentSubscriptions = new Subscription();

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: Constants.otpLength,
    autofocus: true
  };

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router, private ngZone: NgZone, private subService: SubscriptionsService) { }


  ngOnInit(): void {
    if (!!this.accountService.user && !this.accountService.user.twoFactorEnabled) {
      this.user = this.accountService.user;
      this.OnGetQR();
    }else{
      this.router.navigate(['auth']);
    }

  }

  enteredOTP() {
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
      this.accountService.setTwoFA(this.code).subscribe({
        next: response => {
          this.qrData = {} as QRData;
          this.toastr.success("Two FA Set!");
          this.router.navigate(['/book']);
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

  OnGetQR() {
    this.accountService.getQR().subscribe({
      next: response => {
        this.qrData = response;
      }
    })
  }

}
