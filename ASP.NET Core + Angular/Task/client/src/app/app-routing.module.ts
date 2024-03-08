import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [

  {
    path: 'user',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    loadChildren: () => {
        return import('./users/users.module').then(m => m.UsersModule);
    }
},
  {
    path: 'auth', loadChildren: () => {
      return import('./auth/auth.module').then(m => m.AuthModule);
    }
  },
  {
    path: 'book', loadChildren: () => {
      return import('./books/books.module').then(m => m.BooksModule);
    }
  },
  // { path: 'book', component: BooksComponent }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
