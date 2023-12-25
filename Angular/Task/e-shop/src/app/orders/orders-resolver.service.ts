import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { OrderService } from "./orders.service";
import { Injectable } from "@angular/core";
import { UserService } from "../users/user.service";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({ providedIn: 'root' })
export class OrdersResolverService implements Resolve<Order[]> {
    constructor(private orderService: OrderService, private dataStorageService: DataStorageService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order[] | Observable<Order[]> | Promise<Order[]> {
        // const orderDetList = this.orderService.orderDetList;
        // if (orderDetList.length === 0 || !orderDetList) {
        //    this.dataStorageService.fetchOrders();
        // } else {
        //     return orderDetList;
        // }

        this.dataStorageService.fetchOrders();
        return this.orderService.orderDetList;

    }

}