import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-td',
  templateUrl: './forms-td.component.html',
  styleUrls: ['./forms-td.component.css']
})
export class FormsTdComponent {
  
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';

  answer: any = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted =false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // //To set whole form & all elements to be included
    // this.signUpForm.setValue({
    //   userData: {
    //     username : suggestedName,
    //     email : 'test3@gmail.com'
    //   },
    //   secret : 'pet',
    //   questionAnswer : '',
    //   gender : 'male'
    // });

    // //To set specific parts of form 
    this.signUpForm.form.patchValue({
      userData:{
        username : suggestedName,
      }
    });
  }
  

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit() {
    // console.log(this.signUpForm);
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();
    
  }
}
