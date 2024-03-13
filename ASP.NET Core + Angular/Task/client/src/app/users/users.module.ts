import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_modules/shared/shared.module';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserProfileComponent,
    PhotoEditorComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
