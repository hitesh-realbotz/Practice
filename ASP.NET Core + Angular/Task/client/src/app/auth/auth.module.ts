import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', component: AuthComponent },
      // { path: 'forgotpass', component: ForgotPassComponent},
    ]
  },
  // { path: 'forgotpass', component: ForgotPassComponent},
]

@NgModule({
  declarations: [
    AuthComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
