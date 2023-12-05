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

  // roles = ['buyer', 'seller'];
  
  userForm: FormGroup;
  loggedUser: User;
  loggedUserIndex: number;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService){ }


  ngOnInit() {
    this.loggedUser = this.userService.loggedUser;
    this.userForm = new FormGroup({
      'email': new FormControl(this.loggedUser.email, [Validators.required, Validators.email]),
      // 'role': new FormControl(this.loggedUser.role, [Validators.required]),
      'question': new FormControl(this.loggedUser.question),
      'answer': new FormControl(this.loggedUser.answer),
    });
    this.loggedUserIndex = this.userService.getUserIndex(this.loggedUser.id);

    // this.userForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // this.userForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );

  }

  onSubmit() {

    // this.loggedUser.role = this.userForm.value['role'];
    this.loggedUser.question = this.userForm.value['question'];
    this.loggedUser.answer = this.userForm.value['answer'];
    
    this.userService.updateUser(this.loggedUser, this.loggedUserIndex);

    this.router.navigate(['user']);
    this.toastr.info('User Deatils Updated', 'Update Success!');
    this.userForm.reset();

  }

  



}