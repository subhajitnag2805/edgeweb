import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  public baseURL: string = "http://mitapi.memeinfotech.com:5020";

  constructor(private http: Http) { }

  // send otp
  sendOTP(phone: string) {
    let _base = this;
    // ...using get request
    let postData = {
      role: 'individual',
      phoneNumber: phone
    };
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.post(_base.baseURL + '/user/resendOtp', postData, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
        success => {
          resolve(success);
        },
        err => {
          reject(err);
        });
    });
  }

  //verify otp
  verifyOTP(code: any, phone: any) {
    let _base = this;
    // ...using get request
    let postData = {
      code: code,
      phoneNumber: phone
    };
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.post(_base.baseURL + '/user/verifyOTP', postData, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
        success => {
          resolve(success);
        },
        err => {
          reject(err);
        });
    });
  }

  // get user by user ID
  getUser(userID: string) {
    let _base = this;
    // ...using get request
    return new Promise(function (resolve, reject) {
      
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let myParams = new URLSearchParams();
      myParams.append('_id', userID);
      let options = new RequestOptions({ headers: headers, params: myParams }); // Create a request option
      return _base.http.get(_base.baseURL + '/individual/getindividualDetails?_id=' + userID)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
        success => {
          console.log(userID);
          
          resolve(success);
        },
        err => {
          console.log(userID);
          
          reject(err);
        });
    });
  }

}
