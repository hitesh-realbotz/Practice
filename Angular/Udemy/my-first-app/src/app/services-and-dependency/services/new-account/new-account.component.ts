import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from 'src/app/services-and-dependency/services/logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService] // for component & sub-Component level instantiation
})
export class NewAccountComponent {

  // // Comment incase LoggingService injected in AccountsService
  // constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  constructor(private accountsService: AccountsService) {
    accountsService.statusUpdated.subscribe(
      (status: string) => alert('Status is : '+status)
    );
    console.log("alert msg event attached");
   } 

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);

    // // Comment incase LoggingService injected in AccountsService
    // this.loggingService.logStatusChange(accountStatus);
    
  }

  // // Without using data storage
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  // constructor(private loggingService: LoggingService) { }

  // onCreateAccount(accountName: string, accountStatus: string) {
  //   this.accountAdded.emit({
  //     name: accountName,
  //     status: accountStatus
  //   });

  //   this.loggingService.logStatusChange(accountStatus);
  //   // const service = new LoggingService();
  //   // service.logStatusChange(accountStatus);

  //   // console.log('A server status changed, new status: ' + accountStatus);
  // }
}
