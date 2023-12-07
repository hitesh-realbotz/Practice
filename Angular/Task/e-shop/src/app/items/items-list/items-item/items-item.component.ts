import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../item.model';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-items-item',
  templateUrl: './items-item.component.html',
  styleUrls: ['./items-item.component.css']
})
export class ItemsItemComponent implements OnInit {

  @Input('item') item: Item;
  @Input() index: number;

  role: string = 'buyer';

  constructor(private userService: UserService,
              private itemService: ItemsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if(this.router.url.includes('shop')){
      this.role = this.userService.loggedUser.role;
    }
  }
  onEditItem(index: number) {
    console.log('Edit clicked'+index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
  }
  onDeleteItem(index){
    console.log('Delete clicked'+index);
    this.itemService.deleteItem(index);
  }
  onAddToCart(event: Event,index: number){
    event.stopPropagation();
    console.log('AddToCart clicked'+index);
    this.itemService.updateCart(index);
    this.router.navigate(['items']);
  }
  onItem(index){
    this.router.navigate([index], { relativeTo: this.route.parent })
  }
}
