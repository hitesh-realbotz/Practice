import { Injectable } from "@angular/core";
import { User } from "../auth/user.model";
import { BehaviorSubject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    user = new BehaviorSubject<User>(null);
    users: User[] = [];
    

    constructor(private dataStorageService: DataStorageService, private toastr: ToastrService, 
                private datastorageService: DataStorageService) { }

    addUser(user: User) {
        this.users.push(user);
        this.user.next(user);
        this.dataStorageService.storeUsers();
    }

    getUsers() {
        return this.users.slice();
    }

    updateUser(loggedUser: User, index: number) {
        console.log(loggedUser);
        this.users[index] = loggedUser;

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser) );        
        localStorage.setItem('userList', JSON.stringify(this.users));
        this.dataStorageService.storeUsers();
    }

    getUserIndex(id: string) {
        console.log('user-service index');
        console.log(id);
        for (const [index, userFromList] of this.users.entries()) {
            //    console.log(userFromList);
            //    console.log(userFromList.id === id);
            if (userFromList.id === id) {
                console.log('User found at index:', index);
                return index;
            }
        }
        return -1;
    }


}