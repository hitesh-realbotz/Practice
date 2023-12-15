import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { OrderService } from "./orders.service";
import { Injectable } from "@angular/core";
import { UserService } from "../users/user.service";

@Injectable({ providedIn: 'root' })
export class OrdersResolverService implements Resolve<Order[]> {
    constructor(private orderService: OrderService, private userService: UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order[] | Observable<Order[]> | Promise<Order[]> {
        const orderDetList = this.orderService.orderDetList;
        if (orderDetList.length === 0 || !orderDetList) {
            if ((JSON.parse(localStorage.getItem('orderDetList'))) === null) {
                this.orderService.orderDetList = [];
            } else {
                this.orderService.orderDetList = JSON.parse(localStorage.getItem('orderDetList'));
                setTimeout(() => {
                    this.orderService.orderDetList = this.orderService.orderDetList.filter(order =>
                        order.buyerId === this.userService.loggedUser.id ||
                        order.orderedItems.some(item => item.sellerId === this.userService.loggedUser.id) );
                }, 1000);
                console.log('this.orderService.orderDetList from Resolver');
                console.log(this.orderService.orderDetList);
            }
        } else {
            return orderDetList;
        }

    }

}