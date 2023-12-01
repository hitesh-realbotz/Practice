import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { UserService } from "../users/user.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userList: User[];

    constructor(private http: HttpClient, private userService: UserService, private router: Router, private dataStorageService: DataStorageService) { }

    logout() {
        this.userService.loggedUserChanged.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('loggedUser');
        // if (this.tokenExpirationTimer) {
        //     clearTimeout(this.tokenExpirationTimer);
        // }
        // this.tokenExpirationTimer = null;
    }

    forgotPass(email: string){
        const user = this.userService.getUserSecurityQuestion(email);
        return user;
    }
    resetPass(user: User){
        let index = this.userService.getUserIndex(user.id);
        this.userService.updateUser(user, index);
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

                    console.log(resData);
                    
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