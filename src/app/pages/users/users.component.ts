import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';
import { UsersService } from '../../providers/users.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  accessToken: string;
  users: User[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    public router: Router
  ) {
    this.accessToken = this.authService.getToken();
  }

  ngOnInit() {
    if (!this.accessToken) this.router.navigate(['/login']);
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
