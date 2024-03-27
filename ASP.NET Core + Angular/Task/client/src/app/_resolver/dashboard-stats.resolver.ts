import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { UserService } from '../_services/user.service';
import { UserDashboardStat } from '../_models/userDashboardStat';

export const dashboardStatsResolver: ResolveFn<boolean | UserDashboardStat> = (route, state) => {
  const userService = inject(UserService);

  return userService.getUserDashboardStat();
};
