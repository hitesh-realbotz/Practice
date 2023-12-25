import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router, private authService: AuthService) { }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("CanLoad called");
        return this.authService.user.pipe(
            take(1),
            map(loggedUser => {
                if (loggedUser != null) {
                    return true;
                }
            }
            )
        )
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("CanActivate called");
        return this.authService.user.pipe(
            take(1),
            map(loggedUser => {
                if (loggedUser != null) {
                    return true;
                }
            }
            )
        )
    }
}