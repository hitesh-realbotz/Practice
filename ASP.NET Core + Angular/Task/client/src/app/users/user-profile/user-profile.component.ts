import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { QRData } from 'src/app/_models/qrdata';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {} as User;
  activeTab?: TabDirective;
  qrData: QRData = {} as QRData;
  twoFAForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: data => {
        if (!!data) {
          this.user = data;
        }
      }
    })
  }
  initializeForm() {
    this.twoFAForm = this.fb.group({
      code: ['', Validators.required],

    });

  }

  OnGetQR() {
    this.accountService.getQR().subscribe({
      next: response => {
        this.qrData = response;
      }
    })
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Security' && this.user) {
      this.accountService.currentUser$.subscribe({
        next: data => {
          if (!!data) {
            this.user = data;
          }
        }
      })
    }
  }

  onSubmit(twoFAForm: NgForm) {

    this.accountService.setTwoFA(twoFAForm.value).subscribe({
      next: response => {
        console.log("2FA Set "+response.isTwoFAEnabled);
        this.qrData = {} as QRData;
      },
      error: error => {
        console.log(error.error);
        this.toastr.info("Try again!", error.error);
      }
    })



  }

}
