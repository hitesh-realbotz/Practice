import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { TwoFaSetupComponent } from './two-fa-setup/two-fa-setup.component';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', component: AuthComponent },
      // { path: 'two-fa', component: TwoFaSetupComponent},
    ]
  },
  { path: 'two-fa', component: TwoFaSetupComponent},
  // { path: 'forgotpass', component: ForgotPassComponent},
]

@NgModule({
  declarations: [
    AuthComponent,
    TextInputComponent,
    TwoFaSetupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,

  ]
})
export class AuthModule { }
