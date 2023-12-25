import { Injectable } from "@angular/core";
import { CartItem } from "../items/cart/cartItem.model";
import { UserService } from "src/app/users/user.service";
import { Order } from "./order.model";
import { OrderItem } from "./order-item.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { ItemsService } from "../items/items.service";
import { CartService } from "../items/cart/cart.service";
import { DataStorageService } from "../shared/data-storage.service";


@Injectable({ providedIn: 'root' })
export class OrderService {

    ordersChanged = new Subject<Order[]>();
    orderDetList: Order[] = [];
    constructor(private userService: UserService, 
        private router: Router, 
        private itemService: ItemsService, 
        private cartService: CartService, 
        private dataStorageService: DataStorageService) { }


    //Add new Order to array & on Remote-Server and Clears Cart
    newOrder(newOrder: Order, items: CartItem[]) {
        const orderItems: OrderItem[] = [];
        for (const selectedItem of items) {
            orderItems.push(new OrderItem(selectedItem));    
            this.itemService.getItemById(selectedItem.item.itemId).availableQty -= selectedItem.qty;
        }
        newOrder.orderedItems = orderItems;
        newOrder.orderId = this.orderDetList.length + 1;
        this.orderDetList.push(newOrder);
        this.ordersChanged.next(this.orderDetList);
        this.cartService.clearCart(true);
        this.dataStorageService.storeOrders();
        this.dataStorageService.storeItems();
        this.router.navigate(['/orders', newOrder.orderId, 'success']);
    }

    //Sets Orders
    setOrders(orders: Order[]) {
        this.orderDetList = !!orders ? orders : [];
        this.ordersChanged.next(this.orderDetList.slice());
    }


    //Gets Orders
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
        return this.orderDetList.filter(order => order.buyerId === index);
    }

    //Get Orders by SelllerId
    getOrdersBySellerId(sellerId: string) {
        console.log('getOrdersBySellerId called');
        const orders = JSON.parse(JSON.stringify(this.orderDetList.filter(order => order.orderedItems.some(item => item.sellerId === sellerId))));
        for (const order of orders) {
            const orderedItems = [];
            let totalPrice = 0;
            for (const item of order.orderedItems) {
                if (item.sellerId === sellerId) {
                    orderedItems.push(item);
                    totalPrice += item.price;              
                }
            }
            order.orderedItems = orderedItems;
            order.totalPrice = totalPrice;
        }
        return orders;
    }

    //Get ItemById for item in Order
    getItemById(id: number) {
        return this.itemService.getItemById(id);
    }

    //Get ItemIndexById for item in Order
    getItemIndexById(id: number) {
        return this.itemService.getItemIndexById(id);
    }
}