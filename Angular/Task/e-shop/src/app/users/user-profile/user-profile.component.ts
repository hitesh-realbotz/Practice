import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


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
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private location: Location, private ngZone: NgZone) { }


  ngOnInit() {
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        if (!!user) {
          this.loggedUser = user;
          this.initForm();
          this.loggedUserIndex = this.userService.getUserIndex(this.loggedUser.id);
        }
      });
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      'email': new FormControl(this.loggedUser.email, [Validators.required, Validators.email]),
      // 'role': new FormControl(this.loggedUser.role, [Validators.required]),
      'question': new FormControl(this.loggedUser.question, [Validators.required, this.checkQuestion.bind(this)]),
      // 'question': new FormControl(this.loggedUser.question),
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

  // formValidate() {
  //   let isValid = false;
  //   (this.userForm.get('question').hasError('required')
  //     || this.userForm.get('question').hasError('checkQuestion')
  //     || this.userForm.get('answer').hasError('required')
  //     || this.userForm.get('answer').hasError('checkWhiteSpace')
  //   ) ? isValid = false
  //     : isValid = true;
  //   return isValid;
  // }

  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

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

  onCancel() {
    this.location.back();
  }





}