import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { PaymentComponent } from './payment/payment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OtpInputModalComponent } from './otp-input-modal/otp-input-modal.component';


@NgModule({
  declarations: [
    PaymentComponent,
    AboutUsComponent,
    OtpInputModalComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    FileUploadModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    NgxOtpInputModule,
    ReactiveFormsModule


  ],
  exports: [
    ToastrModule,
    ButtonsModule,
    ModalModule,
    FileUploadModule,
    BsDropdownModule,
    PaginationModule,
    FormsModule,
    NgxOtpInputModule,
    ReactiveFormsModule
    
  ]
})
export class SharedModule { }
