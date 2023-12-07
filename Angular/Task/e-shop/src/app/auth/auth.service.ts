import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, map, switchMap, tap } from "rxjs";
import { User } from "./user.model";
import { UserService } from "../users/user.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { UserDetails } from "./userdetails.model";
import { Item } from "../items/item.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind?: string;
    registered?: boolean;
    passwordHash?: string;
    providerUserInfo?: [
        {
            providerId: string,
            federatedId: string
        }
    ]
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    private userList: User[];
    // user = new BehaviorSubject<User>(null);
    user = new BehaviorSubject<number>(null);

    constructor(private http: HttpClient, private userService: UserService, private router: Router, private dataStorageService: DataStorageService, private toastr: ToastrService) { }

    logout() {
        this.userService.loggedUser = null;
        this.userService.loggedUserChanged.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('loggedUserIndex');
        // if (this.tokenExpirationTimer) {
        //     clearTimeout(this.tokenExpirationTimer);
        // }
        // this.tokenExpirationTimer = null;
    }

    autoLogin() {
        console.log(" AutoLogin Called ");
        if ((JSON.parse(localStorage.getItem('loggedUserIndex'))) === null) {
            console.log(" Routing to Auth ");
            this.router.navigate(['/auth']);
            return;

        } else {

            // const logUser = JSON.parse(localStorage.getItem('loggedUserAuth'));
            // this.userService.loggedUser = logUser;
            // console.log("AuthService logUser : " + logUser);
            // console.log(logUser);
            // this.userService.loggedUserChanged.next(logUser);
            // this.user.next(logUser);

            const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
            console.log("userIndex from authServ");
            console.log(userIndex);
            this.user.next(userIndex);

            this.toastr.info('Page Refreshed');
        }
    }

    forgotPass(email: string) {
        const user = this.userService.getUserSecurityQuestion(email);
        return user;
    }

    resetPass(curUser: User, newPassword: string) {

        return this.login(curUser.email, curUser.password).pipe(
            switchMap((loginResData: any) => {

                return this.upPassValues(loginResData, curUser, newPassword);
            }),
            tap((changePassResData: any) => {
                console.log('Password changed successfully:', changePassResData);
            })
        );
    }

    upPassValues(resData: any, user: User, newPassword: any) {
        this.logout();
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtTcyhpDusuHkmfcfhcigrAkLN9EhLGSU',
            {
                "idToken": resData.idToken,
                "password": newPassword,
                "returnSecureToken": true
            }
        )
            .pipe(
                tap(resData => {
                    const updatedUser = this.handleAuthentication(resData.localId, resData.email, newPassword, resData.idToken, +resData.expiresIn);
                    this.userService.ChangePass(updatedUser, user);
                })
            );
    }

    //Not Working as user not logged-in
    upPassValuesDirect(tokenVal: any, user: User, newPassword: any) {
        // this.logout();
        console.log(tokenVal);
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtTcyhpDusuHkmfcfhcigrAkLN9EhLGSU',
            {
                "idToken": tokenVal,
                "password": newPassword,
                "returnSecureToken": true
            }
        )
            .pipe(
                tap(resData => {
                    const updatedUser = this.handleAuthentication(resData.localId, resData.email, newPassword, resData.idToken, +resData.expiresIn);
                    this.userService.ChangePass(updatedUser, user);
                })
            );
    }



    signup(email: string, password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtTcyhpDusuHkmfcfhcigrAkLN9EhLGSU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                // catchError(this.handleError),
                tap(resData => {
                    const user = this.handleAuthentication(resData.localId, resData.email, password, resData.idToken, +resData.expiresIn);
                    this.userService.addUser(user);
                    // this.dataStorageService.userCred(resData.localId ,email, password);
                }));
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtTcyhpDusuHkmfcfhcigrAkLN9EhLGSU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                // catchError(this.handleError),
                tap(resData => {
                    const user = this.handleAuthentication(resData.localId, resData.email, password, resData.idToken, +resData.expiresIn);
                    this.userService.setLoggedUser(user);
                }));
    }

    private handleAuthentication(userId: string, email: string, password: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(userId, email, password, token, expirationDate);
        console.log(user);
        // this.autoLogout(expiresIn * 1000);
        // this.autoLogout(2000);
        return user;
    }

}