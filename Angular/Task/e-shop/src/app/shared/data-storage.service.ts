import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { tap } from "rxjs";
import { Item } from "../items/item.model";
import { ItemsService } from "../items/items.service";
import { OrderService } from "../orders/orders.service";
import { Order } from "../orders/order.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private userService: UserService;
    private itemService: ItemsService;
    private orderService: OrderService;
    private authService: AuthService
    // users: User[];

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private injector: Injector,
        private router: Router) { }

    storeItems() {
        this.getItemServiceInstance();
        const items = this.itemService.getItems();
        console.log(this.itemService.getItems());
        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/items.json', items).subscribe(response => {
            console.log(response);

        });
        this.toastr.info('Remote data updated!', 'Data to server Action');
        return true;
    }

    fetchItems() {
        this.getItemServiceInstance();
        return this.http.get<Item[]>('https://e-shop-4223f-default-rtdb.firebaseio.com/items.json')
            .subscribe(items => {
                console.log('fetchItem', items);
                // if (items == null) {
                //     console.log('fetchItem loggedUser', this.userService.loggedUser);
                //     if (this.userService.loggedUser == null) {
                //         this.router.navigate(['/auth']);
                //     }
                //     this.itemService.setItems(items);
                // } else {
                //     this.itemService.setItems(items);
                // }
                this.itemService.setItems(items);

            });
    }
    storeOrders() {

        this.getOrderServiceInstance();
        const orders = this.orderService.getOrders();

        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/orders.json', orders).subscribe(response => {
            console.log(response);

        });
        this.toastr.info('Remote data updated!', 'Data to server Action');
        return true;
    }
    fetchOrders() {
        console.log('FetchOrders called');
        this.getOrderServiceInstance();
        return this.http.get<Order[]>('https://e-shop-4223f-default-rtdb.firebaseio.com/orders.json')
            .subscribe(orders => {
                console.log('fetched Orders', orders);
                this.orderService.setOrders(orders);
            });
    }

    storeUsers() {
        let userService = this.getUserServiceInstance();
        const users = userService.getUsers();

        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/users.json', users).subscribe(response => {
            console.log(response);
        });
        this.toastr.info('Remote data updated!', 'Data to server Action');
        return true;
    }

    userDetails(userDetails) {
        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/userCred.json', userDetails).subscribe(response => {
            console.log(response);
        });
        this.toastr.info('Remote data userDetails updated!', 'Data to server Action');
        return true;
    }

    fetchUsers() {
        console.log('fetchUser called');
        this.getUserServiceInstance();
        this.getAuthServiceInstance();
        return this.http.get<User[]>('https://e-shop-4223f-default-rtdb.firebaseio.com/users.json')
            .subscribe(users => {
                console.log('fetchUser response ==> ', users);

                const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
                if (userIndex != null) {
                    this.userService.loggedUser = users[userIndex];
                    this.userService.loggedUserChanged.next(this.userService.loggedUser);
                    this.userService.loggedUserIndex = userIndex;
                    this.userService.setUsers(users);
                }

            });
    }

    getUserServiceInstance(): UserService {
        if (!this.userService) {
            this.userService = this.injector.get(UserService);
        }
        return this.userService;
    }
    getItemServiceInstance(): ItemsService {
        if (!this.itemService) {
            this.itemService = this.injector.get(ItemsService);
        }
        return this.itemService;
    }
    getOrderServiceInstance(): OrderService {
        if (!this.orderService) {
            this.orderService = this.injector.get(OrderService);
        }
        return this.orderService;
    }
    getAuthServiceInstance(): AuthService {
        if (!this.authService) {
            this.authService = this.injector.get(AuthService);
        }
        return this.authService;
    }

}