import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthService } from './providers/auth.service';
import { UsersService } from './providers/users.service';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
