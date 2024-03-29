import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

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



  constructor(private subService: SubscriptionsService) { }
  
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
  }


  //Selects tab
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
