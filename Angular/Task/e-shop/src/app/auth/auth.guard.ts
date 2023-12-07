import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.userService.loggedUserChanged.pipe(
            take(1),
            map(loggedUser => {
                console.log(loggedUser);
                console.log(!loggedUser);
                console.log(!!loggedUser);
                const isAuth = !!loggedUser;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }
            )
        )
        // return this.authService.user.pipe(
        //     take(1),
        //     map(user => {
        //     console.log(user);
        //     console.log(!user);
        //     console.log(!!user);
        //     const isAuth = !!user;
        //     if (isAuth) {
        //         return true;
        //     }
        //     return this.router.createUrlTree(['/auth']);
        // }));
    }

}