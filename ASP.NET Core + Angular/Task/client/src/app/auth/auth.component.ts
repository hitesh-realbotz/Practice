import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OtpInputModalComponent } from '../_shared/otp-input-modal/otp-input-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  authForm: FormGroup = new FormGroup({});
  isLoginMode = true;

  bsModalRef: BsModalRef<OtpInputModalComponent> = new BsModalRef<OtpInputModalComponent>();
  isLoading: boolean = false;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private modalService: BsModalService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  //Login & SignUp mode selection
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    // this.toastr.info(this.isLoginMode ? `Switched To Login Mode` : `Switched To SignUp Mode`);
  }

  initializeForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }


  onSubmit(event: Event) {
    if (this.authForm.valid) {
      let authObs: Observable<any>;
    if (this.isLoginMode) authObs = this.accountService.login(this.authForm.value);
    else authObs = authObs = this.accountService.register(this.authForm.value);

    authObs.subscribe(
      {
        next: response => {
          console.log(response);
          // if (!this.isLoginMode || !response.twoFactorEnabled || this.is2FAMode) {
          if (!this.isLoginMode || !response.twoFactorEnabled ) {

            if (!this.isLoginMode) {
              this.toastr.success('SetUp Two Factor Authentication.', 'Account Created!');
              // this.router.navigate(['/user/profile']);
              this.router.navigate(['auth','two-fa']);
            }
            else {
              this.toastr.success('Welcome to bookStore', 'Login Success!');
              if (!response.twoFactorEnabled) {
                this.router.navigate(['auth','two-fa']);
                // this.router.navigate(['/user/profile']);
              } else {
                this.router.navigateByUrl('/book');
              }
            }
          } else {
            const config = {
              class: 'modal-dialog-centered',
              initialState: {
                user: response,
                isSubmitted: false
              }
            }
            this.bsModalRef = this.modalService.show(OtpInputModalComponent, config);
            this.toastr.success('Verify 2FA OTP!');
          }
        }
      }
    )
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

    //To mark All form controls as Touched to display Validation messages on-submit button clicked
    markAllAsTouched() {
      this.ngZone.runOutsideAngular(() => {
        Object.values(this.authForm.controls).forEach(control => {
          control.markAsTouched();
        });
      });
    }

}