import { Injectable } from "@angular/core";
import { User } from "../auth/user.model";
import { BehaviorSubject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    loggedUserChanged = new BehaviorSubject<User>(null);
    loggedUser: User;
    users: User[] = [];
    

    constructor(private dataStorageService: DataStorageService, private toastr: ToastrService, 
                private datastorageService: DataStorageService) { }

    addUser(user: User) {
       // Adding new user to local storage
       if ((JSON.parse(localStorage.getItem('userList'))) == null) {
        const userList: User[] = [user];
        this.users = userList;
        localStorage.setItem('userList', JSON.stringify(userList));
    } else {
        const userList: User[] = JSON.parse(localStorage.getItem('userList'));
        userList.push(user);
        this.users = userList;
        localStorage.setItem('userList', JSON.stringify(userList));
    }

    // this.users.push(user);
    this.loggedUser = user;
    this.loggedUserChanged.next(user);
    this.updateLocalStorage(this.loggedUser, this.users);
    this.dataStorageService.storeUsers();
    }

    getUsers() {
        return this.users.slice();
    }

    setLoggedUser(id: string) {
        this.users = JSON.parse(localStorage.getItem('userList'));
        let index = this.getUserIndex(id);
        if(index != -1){
            const logUser = this.users[index];
            this.loggedUser = logUser;
            this.loggedUserChanged.next(logUser);
            localStorage.setItem('loggedUser', JSON.stringify(logUser));
        }
        
    }

    updateUser(upLoggedUser: User, index: number) {
        this.loggedUser = upLoggedUser;
        this.loggedUserChanged.next(upLoggedUser);
        this.users[index] = this.loggedUser;
        this.updateLocalStorage(this.loggedUser, this.users);
        this.dataStorageService.storeUsers();
    }

    getUserIndex(id: string) {
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

    updateLocalStorage(loggedUser: User, userList: User[]) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        localStorage.setItem('userList', JSON.stringify(userList));
    }


}