import { Injectable, Injector, OnInit } from "@angular/core";
import { User } from "../auth/user.model";
import { BehaviorSubject, Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { UserDetails } from "../auth/userdetails.model";
import { Item } from "../items/item.model";
import { ItemsService } from "../items/items.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    loggedUserChanged = new BehaviorSubject<User>(null);
    // loggedUserChanged = new Subject<User>();
    loggedUser: User;
    usersChanged = new Subject<User[]>();
    users: User[] = [];
    usersDetList: UserDetails[] = [];
    // loggedUserDet: UserDetails;
    loggedUserIndex: number;
    private itemService: ItemsService;

    constructor(private dataStorageService: DataStorageService, private toastr: ToastrService,
        private datastorageService: DataStorageService, private injector: Injector) { }



    addUser(user: User) {
        console.log(this.usersDetList);
        console.log('after');
        this.users.push(user);
        this.loggedUser = user;
        this.loggedUserChanged.next(user);
        this.loggedUserIndex = this.users.length - 1;

        const userDetails = new UserDetails(user.id, user.email);
        // Adding new user to local storage
        if ((JSON.parse(localStorage.getItem('usersDetailList'))) === null) {
            this.usersDetList = [userDetails];
        } else {
            this.usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
            this.usersDetList.push(userDetails);
        }
        localStorage.setItem('usersDetailList', JSON.stringify(this.usersDetList));
        localStorage.setItem('loggedUserIndex', JSON.stringify(this.loggedUserIndex));
        // localStorage.setItem('loggedUserAuth', JSON.stringify(this.loggedUser));
        // this.loggedUserDet = userDetails;
        // this.updateLocalStorage(this.usersDetList, this.loggedUserDet);
        this.dataStorageService.storeUsers();
    }

    getUsers() {
        return this.users.slice();
    }

    setUsers(users: User[]) {
        (users != null) ? (this.users = users) : '';
        // this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    // setLoggedUser(user: User) {

    //     let index = this.getUserIndex(user.id);
    //     if (index != -1) {
    //         this.loggedUser = this.users[index];
    //         this.loggedUserChanged.next(this.loggedUser);   
    //         this.loggedUserDet = new UserDetails(user.id, user.email);
    //         console.log('login local :'+this.loggedUserDet);
    //         localStorage.setItem('loggedUserDetail', JSON.stringify(this.loggedUserDet));
    //     }
    // }

    setLoggedUser(user: User) {
        console.log('set logged user called');
        console.log(user);
        this.loggedUser = user;
        this.loggedUserChanged.next(this.loggedUser);
        console.log("Logged User ===> ");
        console.log(this.loggedUser);

        let index = this.getUserIndex(user.id);
        if (index != -1) {
            this.loggedUser = this.users[index];
            console.log("Logged User ===> ");
            console.log(this.loggedUser);
            this.loggedUserChanged.next(this.loggedUser);
            this.loggedUserIndex = index;
            localStorage.setItem('loggedUserIndex', JSON.stringify(this.loggedUserIndex));
            // localStorage.setItem('loggedUserAuth', JSON.stringify(this.loggedUser));
            // this.loggedUserDet = new UserDetails(user.id, user.email);
            // localStorage.setItem('loggedUserDetail', JSON.stringify(this.loggedUserDet));
        }

    }

    updateUser(upLoggedUser: User, index: number) {
        this.loggedUser = upLoggedUser;
        this.loggedUserChanged.next(upLoggedUser);
        this.users[index] = this.loggedUser;
        console.log(this.users);
        this.dataStorageService.storeUsers();
    }


    getUserIndex(id: string) {

        console.log(id);
        console.log(this.users);
        for (const [index, userFromList] of this.users.entries()) {
            if (userFromList.id === id) {
                console.log('User found at index:', index);
                return index;
            }
        }
        return -1;
    }

    getUserSecurityQuestion(email: string) {
        console.log(this.users);
        for (const userFromList of this.users) {
            if (userFromList.email === email) {

                return userFromList;
            }
        }

    }

    updateLocalStorage(userDetailList: UserDetails[], loggedUserDet: UserDetails) {

        localStorage.setItem('usersDetailList', JSON.stringify(userDetailList));
        localStorage.setItem('loggedUserDetail', JSON.stringify(loggedUserDet));
    }

    ChangePass(updatedUser: User, user: User) {
        console.log('from changePass :' + updatedUser);

        updatedUser.role = user.role;
        updatedUser.question = user.question;
        updatedUser.answer = user.answer;
        this.setLoggedUser(updatedUser);

        let index = this.getUserIndex(updatedUser.id);
        console.log(index);
        this.updateUser(updatedUser, index);
    }

    getAuthServiceInstance(): ItemsService {
        if (!this.itemService) {
            this.itemService = this.injector.get(ItemsService);
        }
        return this.itemService;
    }

}