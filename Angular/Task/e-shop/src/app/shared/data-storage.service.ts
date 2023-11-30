import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { tap } from "rxjs";
import { Item } from "../items/item.model";
import { ItemsService } from "../items/items.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private userService: UserService;
    private itemService: ItemsService;
    // users: User[];

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private injector: Injector) { }

    storeItems() {
        this.getItemServiceInstance();
        const items = this.itemService.getItems();
        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/items.json', items).subscribe(response => {
            console.log(response);
            
        });
        this.toastr.info('Remote data updated!', 'Data to server Action');
        return true;
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
        this.getUserServiceInstance();
        return this.http.get<User[]>('https://e-shop-4223f-default-rtdb.firebaseio.com/users.json')
            .subscribe(users => {
                console.log(users);
                this.userService.setUsers(users);
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

}