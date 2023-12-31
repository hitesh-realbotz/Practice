import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";

@NgModule({
    declarations : [
        AuthComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        // RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
        RouterModule.forChild([{ path: '', component: AuthComponent }]),
        SharedModule
    ]
})
export class AuthModule {

}