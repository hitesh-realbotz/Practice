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
    private authService: AuthService
    // users: User[];

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private injector: Injector
    ) { }

    storeItems() {
        this.getItemServiceInstance();
        const items = this.itemService.getItems();
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
                console.log(items);
                this.itemService.setItems(items);
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
                console.log('fetchUser respo');
                console.log(users);

                const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
                const logUser = users[userIndex];
                console.log("logUser : "+logUser);
                
                this.userService.loggedUser = logUser;
                this.userService.loggedUserChanged.next(logUser);
                this.userService.setUsers(users);


                // const logUser = this.userService.users[userIndex];
                // this.userService.loggedUser = logUser;
                // console.log("logUser : "+logUser);
                // console.log(logUser);
                // this.userService.loggedUserChanged.next(logUser);
                // this.userService.loggedUserIndex = userIndex;
                // localStorage.setItem('loggedUserIndex', JSON.stringify(userIndex));
                
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
    getAuthServiceInstance(): AuthService {
        if (!this.authService) {
            this.authService = this.injector.get(AuthService);
        }
        return this.authService;
    }

}