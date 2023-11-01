import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
  
})
export class CockpitComponent {

  @Output() serverCreated = new EventEmitter<{serverName: string,serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{blueprintName: string,blueprintContent: string}>();

  // //Using Two-way Binding

  // newServerName = '';
  // newServerContent = '';

  // onAddServer() {
  //   this.serverCreated.emit({
  //     serverName : this.newServerName,
  //     serverContent : this.newServerContent
  //   });
  // }

  // onAddBlueprint() {
  //   this.blueprintCreated.emit({
  //     blueprintName: this.newServerName,
  //     blueprintContent: this.newServerContent
  //   })
  // }

  // //Using Local reference
  // onAddServer(serverNameInput, serverContentInput) {
  //   console.log(serverNameInput.value);
  //   this.serverCreated.emit({
  //     serverName : serverNameInput.value,
  //     serverContent : serverContentInput.value
  //   }); 
  // }

  // onAddBlueprint(serverNameInput, serverContentInput) {
  //   console.log(serverNameInput.value);
  //   this.blueprintCreated.emit({
  //     blueprintName: serverNameInput.value,
  //     blueprintContent: serverContentInput.value
  //   })
  // }


  //Using @ViewChild
  @ViewChild('serverNameInput') serverNameInput: ElementRef;
  @ViewChild('serverContentInput') serverContentInput;

  onAddServer() {
    console.log('button clicked****************');
    console.log(this.serverNameInput);
    // console.log(this.serverNameInput.nativeElement.value);
    this.serverCreated.emit({
          serverName : this.serverNameInput.nativeElement.value,
          serverContent : this.serverContentInput.nativeElement.value
        });
    
  }
  onAddBlueprint() {
    console.log('button clicked****************');
    console.log(this.serverNameInput.nativeElement.value);
    this.blueprintCreated.emit({
          blueprintName: this.serverNameInput.nativeElement.value,
          blueprintContent: this.serverContentInput.nativeElement.value
        });
  }

  
}
