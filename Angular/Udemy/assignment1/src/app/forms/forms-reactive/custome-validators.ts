import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    static invalidPrjName(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test') {
            return { invalidProjectName: true };
        }
        return null;
    }

    static asyncInvalidPrjName(control: FormControl): Promise<any> | Observable<any> {
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