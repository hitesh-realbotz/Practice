import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService] // for component & sub-Component level instantiation
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  // // Comment incase LoggingService injected in AccountsService
  // constructor(private loggingService: LoggingService, private accountsService: AccountsService) { }

  constructor(private accountsService: AccountsService) {
    console.log("accountsService dependency injected in AccountComponent");
   }

  onSetTo(status: string) {
    this.accountsService.updateAccount(this.id, status);

    // // Comment incase LoggingService injected in AccountsService
    // this.loggingService.logStatusChange(status);

    this.accountsService.statusUpdated.emit(status);

  }


  // // Without using data storage
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  // constructor(private loggingService: LoggingService) { }

  // onSetTo(status: string) {
  //   this.statusChanged.emit({id: this.id, newStatus: status});

  //   this.loggingService.logStatusChange(status);
  //   // const service = new LoggingService();
  //   // service.logStatusChange(status);

  //   // console.log('A server status changed, new status: ' + status);
  // }
}
