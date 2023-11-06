import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
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
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AccountsService,LoggingService],  // for application scope/level instantiation
  bootstrap: [AppComponent]
})
export class AppModule { }
