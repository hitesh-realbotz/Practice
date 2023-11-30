import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { UserService } from "../users/user.service";
import { Router } from "@angular/router";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn : 'root'})
export class AuthService{

    private userList: User[];
    
    constructor(private http: HttpClient, private userService: UserService,  private router: Router){ }

    logout(){
        this.userService.loggedUserChanged.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('loggedUser');
        // if (this.tokenExpirationTimer) {
        //     clearTimeout(this.tokenExpirationTimer);
        // }
        // this.tokenExpirationTimer = null;
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


                    const user = this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    this.userService.addUser(user);

                    // // Adding new user to local storage
                    // if ((JSON.parse(localStorage.getItem('userList'))) == null) {
                    //     const userList: User[] = [user];
                    //     this.userService.users = userList;
                    //     localStorage.setItem('userList', JSON.stringify(userList));
                    // } else {
                    //     const userList: User[] = JSON.parse(localStorage.getItem('userList'));
                    //     userList.push(user);
                    //     this.userService.users = userList;
                    //     localStorage.setItem('userList', JSON.stringify(userList));
                    // }
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
                const user = this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                this.userService.setLoggedUser(user.id);                
                
            }));

    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate);
        console.log(user);

        // this.autoLogout(expiresIn * 1000);
        // this.autoLogout(2000);
        
        return user;
    }

}