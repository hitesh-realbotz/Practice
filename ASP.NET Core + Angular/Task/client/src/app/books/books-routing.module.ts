import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { booksResolverResolver } from './books-resolver.resolver';
import { PaymentComponent } from '../_shared/payment/payment.component';
import { cartResolver } from '../_resolver/cart.resolver';

const routes: Routes = [

  { path: 'payment', component: PaymentComponent, resolve: [cartResolver]},
  {
    path: '', component: BooksComponent,
    children: [
      { path: '', component: BookListComponent, resolve: [booksResolverResolver] },
      { path: ':id', component: BookDetailComponent, resolve: [booksResolverResolver] },
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
