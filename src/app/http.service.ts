import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  public baseURL: string = "http://mitapi.memeinfotech.com:5020";

  constructor(private http: Http) { }

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

}
