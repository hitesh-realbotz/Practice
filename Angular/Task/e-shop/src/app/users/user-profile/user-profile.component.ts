import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // roles = ['buyer', 'seller'];

  userForm: FormGroup;
  loggedUser: User = new User('', '', '', '', new Date());
  loggedUserIndex: number;
  componentSubscriptions = new Subscription();
  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    private ngZone: NgZone,
    private subService: SubscriptionService) { }


  ngOnInit() {

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          if (!!user) {
            this.loggedUser = user;
            this.initForm();
            this.loggedUserIndex = this.userService.getUserIndex(this.loggedUser.id);
          }
        })
    );
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      'email': new FormControl(this.loggedUser.email, [Validators.required, Validators.email]),
      'question': new FormControl(this.loggedUser.question, [Validators.required, this.checkQuestion.bind(this)]),
      'answer': new FormControl(this.loggedUser.answer, [Validators.required, this.checkWhiteSpace.bind(this)]),
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }
  checkQuestion(control: FormControl): { [s: string]: boolean } {
    if (control.value == 'Choose Security Question for Password Reset') {
      return { 'checkQuestion': true };
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

  //Updates User Profile
  onSubmit(event: Event) {
    // if (this.formValidate()) {
    if (this.userForm.valid) {
      this.loggedUser.question = this.userForm.value['question'];
      this.loggedUser.answer = this.userForm.value['answer'];
      this.userService.updateUser(this.loggedUser, this.loggedUserIndex);
      this.router.navigate(['user']);
      this.toastr.info('User Deatils Updated', 'Update Success!');
      this.userForm.reset();
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
  }

  //Exit from Form
  onCancel() {
    this.location.back();
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }


}