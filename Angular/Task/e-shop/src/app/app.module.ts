import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing-module';
import { FormsModule } from '@angular/forms';
// import { DropdownDirective } from './shared/dropdown.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
// import { ItemsComponent } from './items/items.component';
// import { UsersComponent } from './users/users.component';
// import { UserProfileComponent } from './users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    AboutUsComponent,
    ForgotPassComponent,
    // ItemsComponent,
    // UsersComponent,
    // UserProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
