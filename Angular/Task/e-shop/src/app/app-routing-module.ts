import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { UsersComponent } from "./users/users.component";
import { AboutUsComponent } from "./shared/about-us/about-us.component";

const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent },
    { path: 'aboutus', component: AboutUsComponent },

    { path: 'user', loadChildren: ()=> {
        // return import('./users/users.module').then(m => m.UsersModule);
        return import('./users/users.module').then(m=> m.UsersModule);
    } },
    { path: 'items', loadChildren: ()=> {
        // return import('./users/users.module').then(m => m.UsersModule);
        return import('./items/items.module').then(m=> m.ItemsModule);
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