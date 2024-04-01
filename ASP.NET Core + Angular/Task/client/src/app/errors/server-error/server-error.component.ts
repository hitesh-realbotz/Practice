import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {
  constructor(private router: Router) { }

  //Navigates to BookList
  onHome(){
    this.router.navigate(['/book']);
  }
}
