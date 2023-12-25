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
    private authService: AuthService;

    constructor(private dataStorageService: DataStorageService, private toastr: ToastrService,
        private datastorageService: DataStorageService, private injector: Injector) { }



    //Add new user to array & on Remote-Server
    addUser(user: User) {
        this.users.push(user);
        this.loggedUser = user;
        this.loggedUserChanged.next(user);
        this.loggedUserIndex = this.users.length - 1;
        const userDetails = new UserDetails(user.id, user.email);
        this.updateLocalStorage(userDetails, this.loggedUserIndex);
        // localStorage.setItem('usersDetailList', JSON.stringify(this.usersDetList));
        // localStorage.setItem('loggedUserIndex', JSON.stringify(this.loggedUserIndex));
        this.dataStorageService.storeUsers();
    }

    //Updates LocalStorage to store UserCart Details
    updateLocalStorage(userDetails: UserDetails, loggedUserIndex: number) {
        this.usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        !!this.usersDetList
            ? (!!this.usersDetList.find(user => user.id === userDetails.id) ? '' : this.usersDetList.push(userDetails))
            : (this.usersDetList = [userDetails]);

        localStorage.setItem('usersDetailList', JSON.stringify(this.usersDetList));
        localStorage.setItem('loggedUserIndex', JSON.stringify(loggedUserIndex));
    }


    //Get User
    getUsers() {
        return this.users.slice();
    }

    //Set User
    setUsers(users: User[]) {
        this.users = !!users ? users : [];
        this.usersChanged.next(this.users.slice());
    }

    //Sets loggedUSer on Login
    setLoggedUser(user: User) {
        console.log('set logged user called', this.users);
        const index = this.getUserIndex(user.id);
        this.loggedUser = this.users[index];
        console.log("Logged User ===> ");
        console.log(this.loggedUser);
        this.loggedUserChanged.next(this.loggedUser);
        this.loggedUserIndex = index;
        this.getAuthServiceInstance();
        this.authService.user.next(this.loggedUserIndex);
        const userDetails = new UserDetails(user.id, user.email);
        this.updateLocalStorage(userDetails, this.loggedUserIndex);
    }

    //Updates user in array & on Remote-Server
    updateUser(upLoggedUser: User, index: number) {
        this.loggedUser = upLoggedUser;
        this.loggedUserChanged.next(upLoggedUser);
        this.users[index] = this.loggedUser;
        console.log(this.users);
        this.dataStorageService.storeUsers();
    }


    //Get UserIndex in array
    getUserIndex(id: string) {
        for (const [index, userFromList] of this.users.entries()) {
            if (userFromList.id === id) {
                console.log('User found at index:', index);
                return index;
            }
        }
        return -1;
    }

    //Gets user's security question for Forgot Password
    getUserSecurityQuestion(email: string) {
        console.log(this.users);
        for (const userFromList of this.users) {
            if (userFromList.email === email) {
                return userFromList;
            }
        }
    }


    //Updates UserDetails on Password Change
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

    //AuthService Instance to avoid dependency injection error
    getAuthServiceInstance(): AuthService {
        if (!this.authService) {
            this.authService = this.injector.get(AuthService);
        }
        return this.authService;
    }

}