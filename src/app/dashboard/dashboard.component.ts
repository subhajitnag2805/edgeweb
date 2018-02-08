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
  phone: string;
  age: any;

  currentUser: any = {};

  constructor(_router: Router, _http: HttpService) {
    let _base = this;
    _base.router = _router;
    _base.http = _http;
  }

  getUser(phone: string) {
    let _base = this;
    return new Promise(function (resolve, reject) {
      _base.http.getUser(phone)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
          this.router.navigate(['/login']);
        });
    });
  }

  ngOnInit() {

    let _base = this;
    _base.phone = this.router.url.split('/')[2];
    console.log(this.phone);
    if (localStorage.getItem("userid") == undefined || localStorage.getItem("userid") == null) {

      this.getUser(this.phone)
        .then(function (success: any) {
          _base.currentUser = success.profile;
          localStorage.setItem("userid", _base.currentUser._id);
          _base.age = _base.getAge(_base.currentUser.dob);

          console.log("Localstorage session", localStorage.getItem("session"));
          if (localStorage.getItem("session") == undefined || localStorage.getItem("session") == null) {
            let sessionTime = new Date().getTime().toString();
            localStorage.setItem("session", sessionTime);
            let localRegisterData = {
              name: _base.currentUser.name,
              email: _base.currentUser.email,
              id: _base.currentUser._id,
              loginTime: new Date(),
              time: sessionTime
            };
            _base.http.localRegister(localRegisterData)
              .then(function (success) {
                console.log("Dashboard Page");
                _base.getTestData()
                  .then(function (success) {
                    console.log("success", success);
                  }, function (error) {
                    console.log("Error fetching test data", error);
                  });
                alert("You have been registerted locally");
              }, function (error) {
                console.log(error);
              });
          }
        }, function (error) {
          alert('Error fetching user ');
        });

    } else {
      console.log("Dashboard Page");
      _base.getTestData()
        .then(function (success) {
          console.log("success", success);
        }, function (error) {
          console.log("Error fetching test data", error);
        });
    }
  }

  // to test
  startTest(type: string) {
    this.router.navigate(['/test', type]);
  }

  public getAge(date) {
    var now = new Date();
    var bdate = new Date(date);
    var age = now.getFullYear() - bdate.getFullYear();
    return age;
  };

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getTestData() {
    let id = localStorage.getItem("userid");
    let time = localStorage.getItem("session");
    let _base = this;
    return new Promise(function (resolve, reject) {
      _base.http.getTestData(time, id)
        .then(function (success) {
          resolve(success);
        }, function (error) {
          reject(error);
        });
    });
  }

}
