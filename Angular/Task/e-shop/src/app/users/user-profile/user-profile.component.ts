import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  roles = ['buyer', 'seller'];
  forbiddenUsernames = ['Max', 'Anna'];
  forbiddenEmailList = ['test@gmail.com', 'test3@gmail.com'];
  
  
  userForm: FormGroup;
  loggedUser: User;
  loggedUserIndex: number;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService){ }


  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.userForm = new FormGroup({
      'email': new FormControl(this.loggedUser.email, [Validators.required, Validators.email]),
      'role': new FormControl(this.loggedUser.role, [Validators.required]),

      'question': new FormControl(this.loggedUser.question),
      'answer': new FormControl(this.loggedUser.answer),
    });
    console.log('user-profile');
    console.log(this.loggedUser.id);

    this.loggedUserIndex = this.userService.getUserIndex(this.loggedUser.id);

    // this.userForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // this.userForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );


  }

  onSubmit() {
   
    // console.log(this.userForm.value['email']);
    // console.log(this.userForm.value['role']);
    // console.log(this.userForm.value['question']);
    // console.log(this.userForm.value['answer']);
    this.loggedUser.role = this.userForm.value['role'];
    this.loggedUser.question = this.userForm.value['question'];
    this.loggedUser.answer = this.userForm.value['answer'];
    
    this.userService.updateUser(this.loggedUser, this.loggedUserIndex);

    this.router.navigate(['user']);
    this.toastr.warning('User Deatils Updated', 'Update Success!');
    // this.userForm.reset();

  }

  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.userForm.get('hobbies')).push(control);
  // }
  // getControls() {
  //   return (<FormArray>this.userForm.get('hobbies')).controls;
  // }
  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   // if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
  //   //   return {'nameIsForbidden': true};
  //   // }
  //   // return null;

  //   if (this.forbiddenUsernames.includes(control.value)) {

  //     return { 'nameIsForbidden': true };
  //   }
  //   return null;
  // }

  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@gmail.com') {
  //         // if (this.forbiddenEmailList.includes(control.value)) {   //incase of accessing email list
  //         resolve({ 'emailIsForbidden': true });
  //       } else {
  //         resolve(null)
  //       }
  //     }, 1500);
  //   })
  //   return promise;
  // }



}