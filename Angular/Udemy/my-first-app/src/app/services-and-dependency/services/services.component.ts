import { Component } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  // providers: [AccountsService] // for component & sub-Component level instantiation
})
export class ServicesComponent {
  
  accounts: {name: string, status: string}[] = [];
 
  constructor(private accountsService: AccountsService) { 
    console.log("accountsService dependency injected in ServicesComponent");
    // accountsService.statusUpdated.subscribe(
    //   (status: string) => alert('Status is : '+status)
    // );
    // console.log("alert msg event attached")
  }
  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }


  // // Without using data storage
  // accounts = [
  //   {
  //     name: 'Master Account',
  //     status: 'active'
  //   },
  //   {
  //     name: 'Testaccount',
  //     status: 'inactive'
  //   },
  //   {
  //     name: 'Hidden Account',
  //     status: 'unknown'
  //   }
  // ];  
  // onAccountAdded(newAccount: {name: string, status: string}) {
  //   this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: {id: number, newStatus: string}) {
  //   this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }
}
