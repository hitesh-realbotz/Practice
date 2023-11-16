import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custome-validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forms-reactive',
  templateUrl: './forms-reactive.component.html',
  styleUrls: ['./forms-reactive.component.css']
})
export class FormsReactiveComponent implements OnInit {


  prjForm: FormGroup;

  ngOnInit() {
    this.prjForm = new FormGroup({
      'prjName' : new FormControl(null, [Validators.required, CustomValidators.invalidPrjName ], CustomValidators.asyncInvalidPrjName),
      // 'prjName': new FormControl(null, [Validators.required, this.invalidPrjName], this.asyncInvalidPrjName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'prjStatus': new FormControl('stable'),
    });
  }

  onSubmit() {
    console.log(this.prjForm.value);
  }

  invalidPrjName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { invalidProjectName: true };
    }
    return null;
  }

  asyncInvalidPrjName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ invalidProjectName: true });
        } else {
          resolve(null);
        }
      }, 1500);
    })
    return promise;
  }
}
