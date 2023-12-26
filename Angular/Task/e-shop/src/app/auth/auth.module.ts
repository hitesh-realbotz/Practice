import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { AuthComponent } from "./auth.component";
import { ForgotPassComponent } from "./forgot-pass/forgot-pass.component";

const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            { path: '', component: AuthComponent},
            // { path: 'forgotpass', component: ForgotPassComponent},
        ]
    },
    { path: 'forgotpass', component: ForgotPassComponent},
]

@NgModule({
    declarations : [
        AuthComponent,
        ForgotPassComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})
export class AuthModule{

}