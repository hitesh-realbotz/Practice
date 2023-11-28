import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent },
    // { path: 'user', component: UsersComponent },

    { path: 'user', loadChildren: ()=> {
        // return import('./users/users.module').then(m => m.UsersModule);
        return import('./users/users.module').then(m=> m.UsersModule);
    } },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}