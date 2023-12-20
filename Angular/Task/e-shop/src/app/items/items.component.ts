import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { Subject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
  selectedItem: Item;
  isAuthenticated: boolean;
  
  constructor(private itemService: ItemsService, private router: Router, private route: ActivatedRoute, private userService: UserService) { }
  
  ngOnInit(){
    console.log('Items Init called');
    this.isAuthenticated = !!this.userService.loggedUser;
    
    this.itemService.itemSelected.subscribe(
      (item: Item) => {this.selectedItem = item}
    )
    
  }
  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

