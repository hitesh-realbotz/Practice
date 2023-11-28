import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: UsersComponent,            // With LazyLoading
        // canActivate: [AuthGuard],
        children:[
        { path: '', component: UsersComponent },
        // { path: 'profile', component: UserProfileComponent },
        
    ]},
    { path: 'profile', component: UserProfileComponent },
]
@NgModule({
    imports : [ RouterModule.forChild(routes) ],
    exports : [ RouterModule ]
})

export class UsersRoutingModule{
        
}