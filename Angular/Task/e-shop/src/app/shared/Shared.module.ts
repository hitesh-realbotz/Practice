import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
    declarations: [

        DropdownDirective,
        PaymentComponent,
        PageNotFoundComponent,
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