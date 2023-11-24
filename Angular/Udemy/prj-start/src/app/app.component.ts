import { Component, EventEmitter, OnInit } from '@angular/core';
import { filter, map, of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prj-start';
  
  // Not required in-case of Routing
  loadedFeature = 'recipe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  constructor(private authService: AuthService, private loggingService: LoggingService){ }
  
  ngOnInit() {
   this.authService.autoLogin();
   this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
