import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { QRData } from 'src/app/_models/qrdata';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

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
  userForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) { }
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: data => {
        if (!!data) {
          this.user = data;
          this.initializeForm();
        }
      }
    });
    // this.initializeForm();
  }
  initializeForm() {
    this.twoFAForm = this.fb.group({
      code: ['', [Validators.required, this.checkWhiteSpace.bind(this)]],
    });
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      name: [this.user.name, [Validators.required, this.checkWhiteSpace.bind(this)]],
      city: [this.user.city, [Validators.required, this.checkWhiteSpace.bind(this)]],
      country: [this.user.country, [Validators.required, this.checkWhiteSpace.bind(this)]],
      gender: [this.user.gender || 'male'],

    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }

  //To mark All form controls as Touched to display Validation messages on-submit button clicked
  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
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
  onSubmitProfile(event: Event) {
    if (this.userForm.valid) {
      this.userService.updateProfile(this.userForm.value).subscribe({
        next: response => {
          this.toastr.success("Profile updated!");
        },
        error: error => {
          console.log(error.error);
          this.toastr.info("Try again!", error.error);
        }
      })
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }

  }


  onSubmit(event: Event) {
    if (this.userForm.valid) {
      this.accountService.setTwoFA(this.twoFAForm.value).subscribe({
        next: response => {
          console.log("2FA Set " + response.twoFactorEnabled);
          this.qrData = {} as QRData;
        },
        error: error => {
          console.log(error.error);
          this.toastr.info("Try again!", error.error);
        }
      });
    }
    else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
  }

  //Exit from Form
  onCancel() {
    // this.location.back();
  }

}
