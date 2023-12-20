import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  isShop: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){ }
  ngOnInit() {
    this.userService.loggedUserChanged.subscribe(
      (user: User)=> {
        if (!!user) {
          
          this.isShop = !!user.shop;
          console.log('isShop : '+!!this.userService.loggedUser.shop);
        }
      }
    )
    // this.isShop = !!this.userService.loggedUser.shop;
  }
  
  onNewItem(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onShopOrders() {
    this.router.navigate(['/shop/orders']);
  }
  onShopDetails(){
    this.router.navigate(['details'], { relativeTo: this.route });
  }
}
