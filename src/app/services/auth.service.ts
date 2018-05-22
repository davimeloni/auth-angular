import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  url = 'http://localhost:3000/';

  constructor(
    private http: Http
  ) { }

  buyYLM(user) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put(this.url + 'users/buyylm', user, {headers: headers})
      .map(res => res.json());
  }

  signUpUser(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.url + 'users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.url + 'users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.url + 'users/profile', {headers: headers})
      .map(res => res.json());
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    //localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
    return tokenNotExpired('id_token');
  }

}
