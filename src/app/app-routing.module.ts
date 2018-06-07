import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './pages/login/login.component';
import { UsersComponent }   from './pages/users/users.component';
import { UserComponent }   from './pages/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
