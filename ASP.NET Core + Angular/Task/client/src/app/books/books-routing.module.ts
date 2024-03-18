import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '', component: BooksComponent,
    children: [
      { path: '', component: BookListComponent },
      // { path: 'forgotpass', component: ForgotPassComponent},
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
