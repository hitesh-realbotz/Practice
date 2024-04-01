import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { Constants } from 'src/app/_models/constants';
import { QRData, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

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
  
  constructor(private accountService: AccountService) { }


  ngOnInit(): void {
    if (!!this.user && !this.user.twoFactorEnabled) {
      this.OnGetQR();
    } 
  }

  //Gets QRData
  OnGetQR() {
    this.accountService.getQR().subscribe({
      next: response => {
        this.qrData = response;
      }
    })
  }

}
