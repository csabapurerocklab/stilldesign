import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  accessToken: string;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.accessToken = this.authService.getToken();
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  onSubmit() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe(data => {
      this.router.navigate(['/users']);
    });
    this.loginForm.reset();
  }
}
