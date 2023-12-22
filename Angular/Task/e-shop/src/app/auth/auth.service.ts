import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, map, switchMap, tap } from "rxjs";
import { User } from "./user.model";
import { UserService } from "../users/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ItemsService } from "../items/items.service";

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

    user = new BehaviorSubject<number>(null);

    constructor(private http: HttpClient,
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService,
        private itemService: ItemsService) { }

    //LogOut User
    logout() {
        this.userService.loggedUser = null;
        this.userService.loggedUserIndex = null;
        this.userService.loggedUserChanged.next(null);
        localStorage.removeItem('loggedUserIndex');
        if (!!this.itemService.items) {
            this.router.navigate(['/items']);
        } else {
            this.router.navigate(['/auth']);
        }
    }


    //AutoLogin on Page-Refresh
    autoLogin() {
        console.log(" AutoLogin Called ");
        if ((JSON.parse(localStorage.getItem('loggedUserIndex'))) === null) {
            console.log(" Routing to Auth ");
            // this.router.navigate(['/items']);
            return;
        } else {
            const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
            console.log("userIndex from authServ");
            console.log(userIndex);
            this.user.next(userIndex);
            this.toastr.info('Page Refreshed');
        }
    }

    //Gets UserDetails onClick Forgot Password
    forgotPass(email: string) {
        const user = this.userService.getUserSecurityQuestion(email);
        return user;
    }

    //Recieves CurrentUser & NewPassword from user & updates Password
    resetPass(curUser: User, newPassword: string) {
        return this.login(curUser.email, curUser.password).pipe(
            //Nesting Observables => Passing data from one Obs to Another
            switchMap((loginResData: any) => {
                return this.upPassValues(loginResData, curUser, newPassword);
            }),
            tap((changePassResData: any) => {
                console.log('Password changed successfully:', changePassResData);
            })
        );
    }

    //Password updation
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


    //SignUp Processing
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtTcyhpDusuHkmfcfhcigrAkLN9EhLGSU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                tap(resData => {
                    const user = this.handleAuthentication(resData.localId, resData.email, password, resData.idToken, +resData.expiresIn);
                    this.userService.addUser(user);
                }));
    }

    //Login Processing
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

    //Maintain User Record
    private handleAuthentication(userId: string, email: string, password: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(userId, email, password, token, expirationDate);
        console.log(user);
        return user;
    }

}