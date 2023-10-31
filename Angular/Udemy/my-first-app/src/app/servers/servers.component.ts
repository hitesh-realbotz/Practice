import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  // selector: '#app-servers',
  templateUrl: './servers.component.html',
  // template: `<app-server></app-server> <app-server></app-server>`,
 
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit {
    allowNewServer = false;
    serverCreationStatus = "Server not created";
    serverName = "InitialName";
    userName = "";
    serverCreated = false;
    showPassword = false;
    logItem = [];

  
    constructor() {
        setTimeout(()=> {this.allowNewServer=true},2000);
        // setTimeout(function(){this.allowNewServer=true},2000);
      }
    
      ngOnInit(): void {
        // throw new Error('Method not implemented.');
      }

      onCreateServer(){
        this.serverCreated = true;
        console.log("button clicked");
        this.serverCreationStatus = "Server Created Successfully! & Name is "+ this.serverName;
      }

      onUpdateServerName(event: Event){
        // console.log(event.target.value);
        this.serverName = (<HTMLInputElement>event.target).value;
        console.log(this.serverName);
      }

      showDetails(){
        this.showPassword = !this.showPassword;
        // this.logItem.push(this.logItem.length + 1);
        this.logItem.push(new Date());
      }



      serverElements = [{type: 'server', name: 'TestServer', content: 'This is Test for Server'}];
          

      // onServerAdded(serverData:{serverName: string,serverContent: string}) {
      onServerAdded(serverData) {
        this.serverElements.push({
          type: 'server',
          name: serverData.serverName,
          content: serverData.serverContent
        });
      }
    
      onBlueprintAdded(blueprintData:{blueprintName: string,blueprintContent: string}) {
        this.serverElements.push({
          type: 'blueprint',
          name: blueprintData.blueprintName,
          content: blueprintData.blueprintContent
        });
      }


}

// export class ServersComponent {
//   allowNewServer = false;
  
//   constructor() {
   
//     setTimeout(()=> {this.allowNewServer=true},2000);
//     // setTimeout(function(){this.allowNewServer=true},2000);
    
//   }
  
// }