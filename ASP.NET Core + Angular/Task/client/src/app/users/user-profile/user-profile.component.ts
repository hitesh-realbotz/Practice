import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { QRData } from 'src/app/_models/qrdata';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild('userTabs', { static: true }) userTabs?: TabsetComponent;
  user: User = {} as User;
  activeTab?: TabDirective;
  componentSubscriptions = new Subscription();



  constructor(private subService: SubscriptionsService, private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) { }
  
  ngOnInit(): void {
    this.componentSubscriptions.add(this.subService.getLoggedUserChanges().subscribe({
      next: data => {
        if (!!data) {
          this.user = data;
          if (!this.user.twoFactorEnabled) {
            this.selectTab('Security');
          }
        }
      }
    }));
    // this.initializeForm();
  }


  selectTab(heading: string) {
    if (this.userTabs != undefined) {
      // this.userTabs.tabs.find(x => x.heading === heading)!.active = true;
      this.userTabs.tabs.forEach(tab => {
        if (tab.heading === heading) {
          tab.active = true;
        }
        else {
          tab.active = false;
        }
      });
    }
  }


  onTabActivated(data: TabDirective) {
    this.activeTab = data;
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }

}
