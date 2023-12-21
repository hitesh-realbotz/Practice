import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RouterModule } from "@angular/router";
import { UsersRoutingModule } from "./users-routing.module";
import { SharedModule } from "../shared/Shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [

        UsersComponent,
        UserProfileComponent,
        DashboardComponent,
    ],
    imports: [
        RouterModule,
        UsersRoutingModule,
        SharedModule,
        ReactiveFormsModule
        // FormsModule,

    ]
})
export class UsersModule{

}