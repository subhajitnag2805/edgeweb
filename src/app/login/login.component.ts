import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variables

  // state variables
  public currentState: string = "";  // phone , code

  // vaule variable
  public phone: any;
  public code: any;
  public userID: any = 0;

  //others
  router: Router;
  http: any;

  constructor(_router: Router, http: HttpService) {
    this.currentState = "phone";
    this.router = _router;
    this.http = http;
  }

  ngOnInit() {
  }

  //submit
  public submit() {
    let _base = this;
    if (this.currentState == "phone") {
      _base.http.sendOTP(_base.phone)
        .then(function (success) {
          console.log(success);
          if (success.profile) {
            _base.userID = success.profile._id;
            _base.currentState = "code";
          } else {
            alert("Not an meme.care user. Please register on the app.");
          }
        }, function (error) {
          console.log(error);
          alert("Error ! try again");
        });
    } else {
      _base.http.verifyOTP(_base.code, _base.phone)
        .then(function (success) {
          console.log(success);
          _base.currentState = "phone";
          _base.router.navigate(['/dashboard', _base.userID]);
        }, function (error) {
          console.log(error);
          alert("Error ! try again");
        });
    }
  }

}
