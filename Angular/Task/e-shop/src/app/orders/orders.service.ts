import { Injectable } from "@angular/core";
import { CartItem } from "../items/cart/cartItem.model";
import { UserService } from "src/app/users/user.service";
import { Order } from "./order.model";
import { OrderItem } from "./order-item.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { ItemsService } from "../items/items.service";


@Injectable({ providedIn: 'root' })
export class OrderService {

    ordersChanged = new Subject<Order[]>();
    orderDetList: Order[] = [];
    constructor(private userService: UserService, private router: Router, private itemService: ItemsService) {
        console.log('Oredr constructor called');

        this.orderDetList = this.orderDetList.filter(order => order.buyerId === this.userService.loggedUser.id ||
            order.orderedItems.some(item => item.sellerId === this.userService.loggedUser.id)
    );
    }


    // newOrder(buyerName: string, contactNo: number, items: CartItem[]) {
    //     const orderItems: OrderItem[] = [];
    //     let totalPrice: number = 0;
    //     for (const selectedItem of items) {
    //         orderItems.push(new OrderItem(selectedItem));
    //         totalPrice += selectedItem.item.price;
    //     }
    //     const newOrder = new Order((this.orderDetList.length+1), this.userService.loggedUser.id, buyerName, contactNo, orderItems, totalPrice);
    //     this.orderDetList.push(newOrder);
    //     console.log(this.orderDetList);
    //     localStorage.setItem('orderDetList', JSON.stringify(this.orderDetList));
    // }

    newOrder(newOrder: Order, items: CartItem[]) {
        const orderItems: OrderItem[] = [];
        for (const selectedItem of items) {
            orderItems.push(new OrderItem(selectedItem));
        }
        newOrder.orderedItems = orderItems;
        const allOrders = JSON.parse(localStorage.getItem('orderDetList'));
        newOrder.orderId = allOrders.length + 1;
        const index = this.orderDetList.push(newOrder) - 1;
        if (index != null) {
            this.ordersChanged.next(this.orderDetList);
            console.log(this.orderDetList);
            allOrders.push(newOrder);
            localStorage.setItem('orderDetList', JSON.stringify(allOrders));
            this.router.navigate(['/orders', newOrder.orderId, 'success']);

        } else {

        }

    }

    getOrders() {
        return this.orderDetList.slice();
    }
    getOrderByIndex(index: number) {
        return this.orderDetList[index];
    }
    getOrderById(index: number) {
        return this.orderDetList.find(order => order.orderId === index)
    }
    getOrdersByBuyerId(index: string) {
        return this.orderDetList.filter(order => order.buyerId === index)
    }

    getOrdersBySellerId(sellerId: string) {
        return this.orderDetList.filter(order =>
            order.orderedItems.some(item => item.sellerId === sellerId));
    }

    getItemById(id: number){
        return this.itemService.getItemById(id);
    }
    getItemIndexById(id: number){
        return this.itemService.getItemIndexById(id);
    }
}