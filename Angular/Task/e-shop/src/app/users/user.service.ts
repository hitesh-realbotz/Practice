import { Injectable, OnInit } from "@angular/core";
import { User } from "../auth/user.model";
import { BehaviorSubject, Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { UserDetails } from "../auth/user-details.model";
import { Item } from "../items/item.model";

@Injectable({ providedIn: 'root' })
export class UserService  {

    loggedUserChanged = new BehaviorSubject<User>(null);
    loggedUser: User;
    usersChanged = new Subject<User[]>();
    users: User[] = [];
    usersDetList: UserDetails[] = [];
    loggedUserDet: UserDetails;


    constructor(private dataStorageService: DataStorageService, private toastr: ToastrService,
        private datastorageService: DataStorageService) { }

    

    addUser(user: User) {
        console.log(this.usersDetList);
        console.log('after');
        
        const userDetails = new UserDetails(user.id, user.email);
        // Adding new user to local storage
        if ((JSON.parse(localStorage.getItem('usersDetailList'))) === null) {
            this.usersDetList = [userDetails];
            

        } else {
            this.usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
            this.usersDetList.push(userDetails);
        }

        this.users.push(user);
        this.loggedUser = user;
        this.loggedUserChanged.next(user);

        this.loggedUserDet = userDetails;
        this.updateLocalStorage(this.usersDetList, this.loggedUserDet);
        this.dataStorageService.storeUsers();
    }

    getUsers() {
        return this.users.slice();
    }

    setUsers(users: User[]){
        (users != null) ? (this.users = users) : '';
        // this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    setLoggedUser(user: User) {

        let index = this.getUserIndex(user.id);
        if (index != -1) {
            this.loggedUser = this.users[index];
            this.loggedUserChanged.next(this.loggedUser);   
            this.loggedUserDet = new UserDetails(user.id, user.email);
            localStorage.setItem('loggedUserDetail', JSON.stringify(this.loggedUserDet));
        }

    }

    updateUser(upLoggedUser: User, index: number) {
        this.loggedUser = upLoggedUser;
        this.loggedUserChanged.next(upLoggedUser);
        this.users[index] = this.loggedUser;
        console.log(this.users);
        this.dataStorageService.storeUsers();
    }

    updateLoggedUserDet(item: Item){
        

    }

    getUserIndex(id: string) {
        for (const [index, userFromList] of this.users.entries()) {
            if (userFromList.id === id) {
                console.log('User found at index:', index);
                return index;
            }
        }
        return -1;
    }

    getUserSecurityQuestion(email: string) {
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


}