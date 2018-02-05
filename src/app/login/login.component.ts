import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpService } from '../http.service';

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

  constructor(_router: Router) {
    this.currentState = "phone";
    this.router = _router;
    // this.http = http;
  }

  ngOnInit() {
  }

  //submit
  public submit() {
    let _base = this;
    if (this.currentState == "phone") {
      this.currentState = "code";
      // _base.http.sendOTP(_base.phone)
      //   .then(function (success) {
      //     console.log(success);
      //   }, function (error) {
      //     console.log(error);
      //   });
    } else {
      this.currentState = "phone";
      this.router.navigate(['/dashboard', _base.userID]);
    }
  }

}
