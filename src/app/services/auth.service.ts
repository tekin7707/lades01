import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestResult, User } from '../models/dataModel';



@Injectable({
  providedIn: 'root'
})


export class AuthService {// environment.SERVICE_BASE+'/user';
  // base_url = 'http://localhost:5001/user';
  base_url = 'https://lades.herokuapp.com/user';
  constructor(private httpClient: HttpClient) {

  }

  async login(u, p) {
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/login';
    console.log(url);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    await this.httpClient.post(url, { email: u, password: p }, { headers: headers }).toPromise()
      .then(
        (d) => {
          console.log(d);
          r = d as RequestResult;
          console.log(r.data);
          localStorage.setItem('ladesAuth', JSON.stringify(r.data));
        }
      )
      .catch((err) => {
        r.message = err;
        r.status = 401;
        return r;
      });
    return r;
  }

  async register(u:User) {
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/register';
    console.log(url);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    await this.httpClient.post(url, u, { headers: headers }).toPromise()
      .then(
        (d) => {
          console.log(d);
          r = d as RequestResult;
          console.log(r.data);
          localStorage.setItem('ladesAuth', JSON.stringify(r.data));
        }
      )
      .catch((err) => {
        console.log(err);
        r.message = err;
        r.status = 401;
        return r;
      });
    return r;
  }

  async update(u:User) {
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/update';
    console.log(url);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    await this.httpClient.post(url, u, { headers: headers }).toPromise()
      .then(
        (d) => {
          console.log(d);
          r = d as RequestResult;
          console.log(r.data);
          localStorage.setItem('ladesAuth', JSON.stringify(r.data));
        }
      )
      .catch((err) => {
        console.log(err);
        r.message = err;
        r.status = 401;
        return r;
      });
    return r;
  }


  async getUserList(cid){
    let r: RequestResult = { status: 200, message: '' };
    await this.httpClient.get(this.base_url+'/getAll').toPromise()
    .then(
      (d) => {
        r.data = d;
        console.log(d);
      }
    )
    .catch((err) => {
      r.status = err.status;
      r.message = err.statusText;
    });
    return r;
  }

  getLoginUser(): any {
    let temp = localStorage.getItem('ladesAuth');
    if (temp) {
      let userStroge = JSON.parse(temp);// as User;

      return userStroge;
    }
    else return null;
  }

  updateStrogeAuth(_user: User) {
    let temp = localStorage.getItem('ladesAuth');
    if (temp) {
      let userStroge = JSON.parse(localStorage.getItem('ladesAuth'));// as User;

      userStroge.firstName = _user.firstName;
      userStroge.lastName = _user.lastName;
      userStroge.token = _user.token;
      userStroge.email = _user.email;
      localStorage.removeItem('ladesAuth');
      localStorage.setItem('ladesAuth', JSON.stringify(userStroge));
    }
  }

  logout() {
    localStorage.removeItem('ladesAuth');
  }

  emailCheck(em: string): string {
    let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(em.toLowerCase());
    if (isValid) return em; else return 'Please enter a valid e-mail address';
  }

  passwordCheck(password): string {
    let r = '';
    if (password.length < 1) r = 'Password does not meet the minimum requirements';
    return r;
  }


}
