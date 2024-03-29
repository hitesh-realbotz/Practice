import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { map, tap } from 'rxjs';
import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
console.log("authGuard");
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return accountService.currentUser$.pipe(
    map(user => {
      if (!!user) return true;
      else {
        toastr.error('Login & Try again!');
        router.navigateByUrl('/book');
        return false;
      }
    })
  );
};
