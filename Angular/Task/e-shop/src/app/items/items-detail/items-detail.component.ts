import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.css']
})
export class ItemsDetailComponent  implements OnInit {

  item: Item;
  index: number;
  role: string = 'buyer';
  constructor(private itemService: ItemsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        if(this.router.url.includes('shop')){
          this.index = this.itemService.sellerItemsIndex[this.index];
          this.role = this.userService.loggedUser.role;
        }
        this.item = this.itemService.getItem(this.index);
      }
    );
  }

  onEditItem(index: number) {
    console.log('Edit clicked'+index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
    // this.router.navigate([index]);
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

}
