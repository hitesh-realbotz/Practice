import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { Constants } from 'src/app/_models/constants';
import { QRData, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

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

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: Constants.otpLength,
    autofocus: true
  };

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    if (!!this.accountService.user && !this.accountService.user.twoFactorEnabled) {
      this.user = this.accountService.user;
      this.OnGetQR();
    }else{
      this.router.navigate(['auth']);
    }

  }

 //Gets QRCode data
  OnGetQR() {
    this.accountService.getQR().subscribe({
      next: response => {
        this.qrData = response;
      }
    })
  }

}
