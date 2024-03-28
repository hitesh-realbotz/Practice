import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDashboardStat } from 'src/app/_models/userDashboardStat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userStats!: UserDashboardStat | null;
  
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    console.log("Orderdetail component");
    this.route.data.subscribe({
      next: data => this.userStats = data['userDashStats']
    });
  }

  //Navigates to list of orders with buyerId == User's Id
  onMyOrders() {
    this.router.navigate(['/order']);
  }

  //Navigates to Cart
  onCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }

  //Navigates to UserProfile
  onProfile() {
    this.router.navigate(['/user/profile']);
  }


}
