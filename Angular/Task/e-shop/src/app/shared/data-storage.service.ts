import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private userService: UserService;
    users: User[];

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private injector: Injector) { }


    storeUsers() {
        let userService = this.getUserServiceInstance();
        const users = userService.getUsers();

        this.http.put('https://e-shop-4223f-default-rtdb.firebaseio.com/users.json', users).subscribe(response => {
            console.log(response);
        });
        this.toastr.info('Remote data updated!', 'Data to server Action');
        return true;
    }

    getUserServiceInstance(): UserService {
        if (!this.userService) {
            this.userService = this.injector.get(UserService);
        }
        return this.userService;
    }


}