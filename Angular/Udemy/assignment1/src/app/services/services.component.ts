import { Component } from '@angular/core';
import { UserService } from './users.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [UserService]
  
})
export class ServicesComponent {

}
