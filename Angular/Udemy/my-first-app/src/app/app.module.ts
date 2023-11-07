import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { ServerComponent } from './server/server.component';
// import { ServersComponent } from './servers/servers.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { ViewEmulComponent } from './view-emul/view-emul.component';
import { ViewNoneComponent } from './view-none/view-none.component';
import { ViewShadowComponent } from './view-shadow/view-shadow.component';
import { DirectiveComponent } from './directive/directive.component';
import { BasicHighlightDirective } from './directive-folder/basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './directive-folder/better-highlight.directive';
import { UnlessDirective } from './directive-folder/unless.directive';
import { ServicesComponent } from './services-and-dependency/services/services.component';
import { AccountComponent } from './services-and-dependency/services/account/account.component';
import { NewAccountComponent } from './services-and-dependency/services/new-account/new-account.component';
import { AccountsService } from './services-and-dependency/services/accounts.service';
import { LoggingService } from './services-and-dependency/services/logging.service';
import { RoutingComponent } from './routing/routing.component';


// comment earlier import of ServiceComponent, ServerComponent
import { HomeComponent } from './routing/home/home.component';
import { UsersComponent } from './routing/users/users.component';
import { ServersComponent } from './routing/servers/servers.component';
import { EditServerComponent } from './routing/servers/edit-server/edit-server.component';
import { ServerComponent } from './routing/servers/server/server.component';
import { UserComponent } from './routing/users/user/user.component';
import { ServersService } from './routing/servers/servers.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent, children:[
    {
      path: ':id/:name', component: UserComponent
    }
  ] },
  // { path: 'users', component: UsersComponent},
  // { path: 'users/:id/:name', component: UserComponent },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ]
  },
  // { path:'servers/:id', component: ServerComponent},
  // { path:'servers/:id/edit', component: EditServerComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    CockpitComponent,
    ServerElementComponent,
    ViewEmulComponent,
    ViewNoneComponent,
    ViewShadowComponent,
    DirectiveComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    ServicesComponent,
    AccountComponent,
    NewAccountComponent,
    RoutingComponent,
    HomeComponent,
    UsersComponent,
    EditServerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AccountsService, LoggingService, ServersService],  // for application scope/level instantiation
  bootstrap: [AppComponent]
})
export class AppModule { }
