import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-obervable',
  templateUrl: './obervable.component.html',
  styleUrls: ['./obervable.component.css']
})
export class ObervableComponent implements OnInit, OnDestroy {
  isActivate = false;
  private sub: Subscription;
  constructor(private userService: UserService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.userService.activateEmitter.subscribe(
      (didActivate) => {
        this.isActivate = didActivate;
      }
    )
  }
}
