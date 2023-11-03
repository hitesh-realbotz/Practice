import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { ServicesComponent } from './services/services.component';
import { ActiveUsersComponent } from './services/active-users/active-users.component';
import { InactiveUsersComponent } from './services/inactive-users/inactive-users.component';
import { CounterService } from './services/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    ServicesComponent,
    ActiveUsersComponent,
    InactiveUsersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
