import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { APP_CONFIG } from '../app-config';

import { AuthService } from './auth.service';


@Injectable()
export class UsersService {
    constructor(
      private http: Http,
      private authService: AuthService) {
    }

    getUsers(): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.access_token });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(APP_CONFIG.apiEndpoint+'/admin/users', options)
        .map((res) => {
          return res.json();
        });
    }

    getUser(id): Observable<any> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.access_token });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(APP_CONFIG.apiEndpoint+'/admin/user/'+id, options)
        .map((res) => {
          return res.json();
        });
    }

    addUser(firstName,lastName,email,phone,password,introduction,position,status): Observable<any> {
      let headers = new Headers({
        'Authorization': 'Bearer ' + this.authService.access_token,
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      let postData = {
          name: firstName+' '+lastName,
          email: email,
          phone: phone,
          password: password,
          introduction: introduction,
          position: position,
          active: status
      }
      return this.http.post(APP_CONFIG.apiEndpoint+'/admin/user', JSON.stringify(postData), options)
        .map((res) => {
          return res.json();
        });
    }

    updateUser(id,firstName,lastName,email,phone,introduction,position,status): Observable<any> {
      let headers = new Headers({
        'Authorization': 'Bearer ' + this.authService.access_token,
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      let postData = {
          firstName: firstName,
          lastName: lastName,
          name: firstName+' '+lastName,
          email: email,
          phone: phone,
          introduction: introduction,
          position: position,
          active: status
      }
      return this.http.put(APP_CONFIG.apiEndpoint+'/admin/user/'+id, JSON.stringify(postData), options)
        .map((res) => {
          return res.json();
        });
    }

    deleteUser(id): Observable<any> {
      let headers = new Headers({
        'Authorization': 'Bearer ' + this.authService.access_token,
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(APP_CONFIG.apiEndpoint+'/admin/user/'+id, options)
        .map((res) => {
          return res.json();
        });
    }

}
