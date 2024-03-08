import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';

const routes: Routes = [
  {
    path: '', component: BooksComponent,
    children: [
      { path: '', component: BooksComponent },
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
