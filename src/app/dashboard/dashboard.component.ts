import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //others
  router: Router;
  http: any;
  userID: string;

  constructor(_router: Router, _http: HttpService) {
    this.router = _router;
    this.http = _http;
    this.userID = this.router.url.split('/')[2];
    console.log(this.userID);
    this.getUser(this.userID);
  }

  getUser(userID: string) {
    let _base = this;
    _base.http.getUser(userID)
      .then(function (success) {
        console.log(success);
      }, function (error) {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  // to test
  startTest(type: string) {
    this.router.navigate(['/test', type]);
  }

}
