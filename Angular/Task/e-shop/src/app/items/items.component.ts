import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { Subject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
  selectedItem: Item;
  
  constructor(private itemService: ItemsService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(){
    console.log('Items Init called');
    
    this.itemService.itemSelected.subscribe(
      (item: Item) => {this.selectedItem = item}
    )
  }
  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

