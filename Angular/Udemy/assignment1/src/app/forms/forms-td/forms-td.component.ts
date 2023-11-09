import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-td',
  templateUrl: './forms-td.component.html',
  styleUrls: ['./forms-td.component.css']
})
export class FormsTdComponent {
  
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  default = this.subscriptions[1];

  @ViewChild('f') signUpForm: NgForm;

  onSubmit() {
    console.log(this.signUpForm);

    console.log("Email : " + this.signUpForm.value.email);
    console.log("Email : " + this.signUpForm.value.subscription);
    console.log("Email : " + this.signUpForm.value.password);
    this.signUpForm.reset();
    this.default = this.subscriptions[1];
  }
}
