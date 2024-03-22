import { HttpParams } from '@angular/common/http';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_models/constants';
import { QRData, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  @Input() user: User | undefined;
  @ViewChild('otpCode') otpCode: NgxOtpInputComponent | undefined;
  code: string = '';
  qrData: QRData = {} as QRData;
  twoFAForm: FormGroup = new FormGroup({});

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: Constants.otpLength,
    autofocus: true
  };
  
  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router, private ngZone: NgZone, private userService: UserService) { }


  ngOnInit(): void {
    if (!!this.user) {
      this.OnGetQR();
    } 
  }

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
      this.accountService.setTwoFA(this.code).subscribe({
        next: response => {
          console.log("Two Factor Authentication Set!" + response.twoFactorEnabled);
          this.qrData = {} as QRData;          
          this.toastr.success("Two FA Set!");
        },
        error: error => {
          console.log(error.error);
          this.toastr.info("Try again!", error.error.message);
        }
      });
    }
    else {
      event.stopPropagation();
      this.markAllAsTouched();
      this.toastr.info("Enter OTP!!");
    }
    this.code = '';
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
