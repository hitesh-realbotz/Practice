import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { booksResolver } from '../_resolver/books.resolver';
import { PaymentComponent } from '../_shared/payment/payment.component';
import { cartResolver } from '../_resolver/cart.resolver';
import { authGuard } from '../_guards/auth.guard';

const routes: Routes = [

  { path: 'payment', component: PaymentComponent, canActivate: [authGuard], resolve: [cartResolver]},
  {
    path: '', component: BooksComponent,
    children: [
      { path: '', component: BookListComponent, resolve: [booksResolver, cartResolver] },
      { path: ':id', component: BookDetailComponent, resolve: [booksResolver, cartResolver] },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BooksRoutingModule { }
