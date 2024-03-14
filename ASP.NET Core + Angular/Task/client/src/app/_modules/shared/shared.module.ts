import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    FileUploadModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()


  ],
  exports: [
    ToastrModule,
    ButtonsModule,
    ModalModule,
    FileUploadModule,
    BsDropdownModule,
    PaginationModule
    
  ]
})
export class SharedModule { }
