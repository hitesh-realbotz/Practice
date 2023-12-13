import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        
        DropdownDirective,
                  PaymentComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule        
    ],
    exports: [
        DropdownDirective,
        CommonModule,
    ]
})
export class SharedModule {

}