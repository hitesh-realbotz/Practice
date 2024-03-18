import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { booksResolverResolver } from './books-resolver.resolver';

const routes: Routes = [
  {
    path: '', component: BooksComponent,
    children: [
      { path: '', component: BookListComponent, resolve: [booksResolverResolver] },
      // { path: 'forgotpass', component: ForgotPassComponent},
      { path: ':id', component: BookDetailComponent, resolve: [booksResolverResolver] },
            // { path: ':id/edit', component: ItemsEditComponent, resolve: [ItemsResolverService]},
    ]
  },
  // { path: 'forgotpass', component: ForgotPassComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BooksRoutingModule { }
