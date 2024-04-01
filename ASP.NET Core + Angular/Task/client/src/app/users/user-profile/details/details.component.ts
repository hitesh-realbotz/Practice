import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_models/constants';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() user: User | undefined;

  userForm: FormGroup = new FormGroup({});

  constructor( private toastr: ToastrService, private fb: FormBuilder, private ngZone: NgZone, private userService: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    let email = '';
    let name = '';
    let city = '';
    let country = '';
    let gender = '';
    if (!!this.user) {
      email = this.user.email;
      name = this.user.name;
      city = this.user.city;
      country = this.user.country;
      gender = this.user.gender;
    }
    this.userForm = this.fb.group({
      email: [email, [Validators.required, Validators.email]],
      name: [name, [Validators.required, this.checkWhiteSpace.bind(this)]],
      city: [city, [Validators.required, this.checkWhiteSpace.bind(this)]],
      country: [country, [Validators.required, this.checkWhiteSpace.bind(this)]],
      gender: [gender || Constants.defaultGender],

    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } | null {
    if (control.value == null || control.value.trim() === '') {
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

  //Profile update on Submit
  onSubmitProfile(event: Event) {
    if (this.userForm.valid) {
      this.userService.updateProfile(this.userForm.value).subscribe({
        next: response => {
          this.toastr.success("Profile updated!");
        }
      })
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }

  }

  //Exit from Form
  onCancel() {
   this.initializeForm();
  }

}
