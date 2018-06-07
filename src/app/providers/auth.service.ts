import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { APP_CONFIG } from '../app-config';

@Injectable()
export class AuthService {
    public access_token: string;

    constructor(private http: Http) {
        this.access_token = this.getToken();
    }

    getToken() {
        var currentSession = JSON.parse(localStorage.getItem('currentSession'));
        return currentSession && currentSession.access_token;
    }

    login(username: string, password: string): Observable<boolean> {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: "2",
            client_secret: "Admin_Production",
            username: username, //"dev@stilldesign.hu",
            password: password, //"StillPass",
            scope: ""
        }

        return this.http.post(APP_CONFIG.apiEndpoint+'/oauth/token', JSON.stringify(postData), {
            headers: headers
        })
            .map((res: Response) => {
              let token = res.json() && res.json();
              if (token) {
                  this.access_token = token.access_token;
                  localStorage.setItem('currentSession', JSON.stringify(token));
                  return true;
              } else {
                  return false;
              }
            });
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout(): void {
        console.log('AuthService logout');
        this.access_token = null;
        localStorage.removeItem('currentSession');
    }
}
