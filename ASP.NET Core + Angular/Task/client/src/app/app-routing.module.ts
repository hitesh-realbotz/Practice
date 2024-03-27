import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BooksComponent } from './books/books.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { authGuard } from './_guards/auth.guard';
import { AboutUsComponent } from './_shared/about-us/about-us.component';

const routes: Routes = [
  {path: 'aboutus', component: AboutUsComponent },
  {
    path: 'user',
    canLoad: [authGuard],
    canActivate: [authGuard],
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
  {
    path: 'order', loadChildren: () => {
      return import('./orders/orders.module').then(m => m.OrdersModule);
    }
  },
  {
    path: 'error', loadChildren: () => {
      return import('./errors/errors.module').then(m => m.ErrorsModule);
    }
  },
  { path: '', redirectTo: '/book', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },

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
