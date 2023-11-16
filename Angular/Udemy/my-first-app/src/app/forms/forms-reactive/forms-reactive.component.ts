import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forms-reactive',
  templateUrl: './forms-reactive.component.html',
  styleUrls: ['./forms-reactive.component.css']
})
export class FormsReactiveComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Max', 'Anna'];
  forbiddenEmailList = ['test@gmail.com', 'test3@gmail.com'];


  ngOnInit() {
    this.signupForm = new FormGroup({
      // 'username': new FormControl(null),
      // 'username': new FormControl(null, Validators.required),
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      'userData': new FormGroup({
        // 'username': new FormControl(null, Validators.required ),
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        // 'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)), //incase of accessing email list
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
      // 'hobbies': new FormArray([new FormControl(null, Validators.required)]), // with initial hobby input
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );


    //To set whole form & all elements to be included
    this.signupForm.setValue({
      userData: {
        username : 'Max',
        email : 'max@gmail.com'
      },
      gender : 'male',
      hobbies : [],
    });

    // //To set specific parts of form 
    this.signupForm.patchValue({
      userData:{
        username : 'Anna',
      },
    });

  }

  onSubmit() {
    console.log(this.signupForm);
    // this.signupForm.reset();
    this.signupForm.reset({ gender : 'male'}); // Pass Objet to set values with reset
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    //   return {'nameIsForbidden': true};
    // }
    // return null;

    if (this.forbiddenUsernames.includes(control.value)) {

      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          // if (this.forbiddenEmailList.includes(control.value)) {   //incase of accessing email list
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null)
        }
      }, 1500);
    })
    return promise;
  }


}
