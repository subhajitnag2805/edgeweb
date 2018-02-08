import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  public baseURL: string = "http://mitapi.memeinfotech.com:5020";
  public  localDBURL: string = "http://localhost:7000";

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
  getUser(phone: string) {
    let _base = this;
    let postData = {
      phoneNumber: phone,
      role: 'individual'
    };
    // ...using get request
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.post(_base.baseURL + '/user/login', postData, options)
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

  localRegister(registerData: any) {
    let _base = this;
    // ...using get request
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.post(_base.localDBURL + '/userRegistration', registerData, options)
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

  /**
   * Send data to loca server
   * 
   * api : updateSensorValues
   * 
   * {
   *     time:string,
   *     id:string,
   *     bodyTemparature   // spelling mistake by Subhajit - considering
   * }
   * 
   * **/
  public sendDataTOLocalDB(sensorData: any) {
    let _base = this;
    // ...using get request
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.put(_base.localDBURL + '/updateSensorValues', sensorData, options)
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

  /**
   * API: gettingPreviousValues
   * type: get
   * params:{
   *    time:string,
   *    id:(userid):string 
   * }
   * 
   * **/

  public getTestData(time: string, id: string) {
    let _base = this;
    // ...using get request
    return new Promise(function (resolve, reject) {
      // let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return _base.http.get(_base.localDBURL + '/gettingPreviousValues?time=' + time + "&id=" + id, options)
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
}
