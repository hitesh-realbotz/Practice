import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {
  onlyOdd = false;
  oddNumbers = [1,3,5];
  evenNumbers = [2,4,6];
  
  value = 5;

}
