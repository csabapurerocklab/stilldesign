import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  accessToken: string = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.accessToken = this.authService.getToken();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
