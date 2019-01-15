import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestResult } from 'app/models/dataModel';
import { Options } from 'selenium-webdriver/ie';

@Injectable({
  providedIn: 'root'
})
export class LadService {
  base_url = 'https://lades-backend.herokuapp.com/lad';
  // base_url = 'http://localhost:5001/lad';

  constructor(private httpClient: HttpClient) {

  }

  async getMyLads() {
    let r: RequestResult = { status: 200, message: '' };
    await this.httpClient.get(this.base_url + '/getAllLads').toPromise()
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

  async getLad(id) {
    let r: RequestResult = { status: 200, message: '' };
    let header = new HttpHeaders();
    header = header.append('_id', 'id');
    await this.httpClient.get(this.base_url + '/getLad', {
      headers: header,
      params: new HttpParams().set('_id', id)
    }).toPromise()
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

  async insertLadItem(ladItem) {
    console.log('insertLadItem');
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/addLadItem';
    console.log(url);
    console.log(ladItem);
    await this.httpClient.post(url, ladItem).toPromise().then(
      (d) => {
        console.log(d);
        r = d as RequestResult;
        console.log(r.data);
      }
    ).catch((err) => {
      r.message = err;
      r.status = 401;
      return r;
    });
    return r;
  }
    
  async updateLadItem(ladItem) {
    console.log('updateLadItem');
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/updateLadItem';
    console.log(url);
    console.log(ladItem);
    await this.httpClient.post(url, ladItem).toPromise().then(
      (d) => {
        console.log(d);
        r = d as RequestResult;
        console.log(r.data);
      }
    ).catch((err) => {
      r.message = err;
      r.status = 401;
      return r;
    });
    return r;
  }

  async deleteLadItem(id) {
    console.log('updateLadItem');
    let r: RequestResult = { status: 0, message: '' };
    let url: string = this.base_url + '/deleteLadItem';
    console.log(url);
    await this.httpClient.delete(url, {
      params: new HttpParams().set('_id', id)
    }).toPromise().then(
      (d) => {
        console.log(d);
        r = d as RequestResult;
        console.log(r.data);
      }
    ).catch((err) => {
      console.log(err);
      r.message = err;
      r.status = 401;
      return r;
    });
    return r;
  }





}
