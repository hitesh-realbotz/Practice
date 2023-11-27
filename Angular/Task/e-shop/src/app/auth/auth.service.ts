import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { User } from "./user.model";


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

    constructor(private http: HttpClient){ }

    

    // Sign-up with email & password 
    // Confirm Role on later stage
    signup(email: string, password: string, role: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGZCkQ8LSRS5cu1phkYoyooDCaSOc8dyE',
        
            {
                email: email,
                password: password,
                role: role,
                returnSecureToken: true
            }
        )
            .pipe(
                // catchError(this.handleError),
                tap(resData => {
                    // const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                    // const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
                    // this.user.next(user);
                    this.handleAuthentication(resData.email, role, resData.localId, resData.idToken, +resData.expiresIn);
                    console.log(resData);
                }));

        
    }

    private handleAuthentication(email: string, role: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, role, userId, token, expirationDate);

        // this.user.next(user);
        // this.autoLogout(expiresIn * 1000);
        // this.autoLogout(2000);
        localStorage.setItem('userData', JSON.stringify(user) );
    }

}