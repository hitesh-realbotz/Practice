import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
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


@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;
    

    constructor(private http: HttpClient, 
                private router: Router) { }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        // localStorage.clear();
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin(){
        const userData:{
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGZCkQ8LSRS5cu1phkYoyooDCaSOc8dyE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    // const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                    // const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
                    // this.user.next(user);
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));

        // .pipe(catchError(errorRes => {
        //     let errorMessage = 'An unknown error occured!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //         // return throwError(errorMessage);
        //         return throwError(() => new Error(errorMessage));
        //     }
        //     switch (errorRes.error.error.message) {
        //         case "EMAIL_EXISTS":
        //             errorMessage = 'This email-Id already registered!';
        //             break;
        //         default:
        //             break;
        //     }
        //     // return throwError(errorMessage);
        //     return throwError(() => new Error(errorMessage));
        // })
        // );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGZCkQ8LSRS5cu1phkYoyooDCaSOc8dyE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));

    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        // this.autoLogout(2000);
        localStorage.setItem('userData', JSON.stringify(user) );
    }


    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            // return throwError(errorMessage);
            return throwError(() => new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = 'This email-Id already registered!';
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = 'This email-Id does not exist!';
                break;
            case "INVALID_PASSWORD":
                errorMessage = 'This is not valid password!';
                break;
            case "INVALID_LOGIN_CREDENTIALS":
                errorMessage = 'Enter valid email & password!';
                break;

            default:
                break;
        }


        // return throwError(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

}