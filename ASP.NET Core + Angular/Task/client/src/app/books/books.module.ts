import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookItemComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    
  ]
})
export class BooksModule { }
