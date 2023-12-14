import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { OrderService } from "./orders.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class OrdersResolverService implements Resolve<Order[]> {
    constructor(private orderService: OrderService){ }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order[] | Observable<Order[]> | Promise<Order[]> {
        const orderDetList = this.orderService.orderDetList;
        if (orderDetList.length === 0 || !orderDetList) {
            if ((JSON.parse(localStorage.getItem('orderDetList'))) === null) {
                this.orderService.orderDetList = [];
            } else {
                this.orderService.orderDetList = JSON.parse(localStorage.getItem('orderDetList'));
            }
        } else {
            return orderDetList;
        }
        
    }

}