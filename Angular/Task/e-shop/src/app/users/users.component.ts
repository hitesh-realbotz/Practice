import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count, from } from 'rxjs';
import { UserService } from './user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})



export class UsersComponent implements OnInit {

    role: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.role = this.userService.loggedUser.role;
    }

}




