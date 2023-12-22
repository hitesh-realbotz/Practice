import { Injectable } from "@angular/core";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { ItemsService } from "../items/items.service";
import { OrderService } from "../orders/orders.service";
import { CartService } from "../items/cart/cart.service";

@Injectable({ providedIn: 'root' })
export class SubscriptionService{

    constructor(private userService: UserService, 
                private itemService: ItemsService,
                private orderService: OrderService,
                private cartService: CartService) { }

    getLoggedUserChanges(){
        return this.userService.loggedUserChanged;
    }
    getItemChanges(){
        return this.itemService.itemChanged;
    }
    getOrderChanges(){
        return this.orderService.ordersChanged;
    }
    getCartItemChangesChanges(){
        return this.cartService.cartItemsChanged;
    }


}