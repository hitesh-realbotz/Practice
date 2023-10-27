import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styleUrls: ['./app.component.css','./app.component2.css']
  // styles: [`
  // h3{
  //   color: red;
  // } 
  // h3{
  //   background-color: yellow;
  // }`]


  // templateUrl: './servers.component.html',
  // // template: `<app-server></app-server> <app-server></app-server>`,
})

export class AppComponent {
  title = 'my-first-app';
  name = 'Max';
}
