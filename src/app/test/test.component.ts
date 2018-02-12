import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { setTimeout, clearInterval } from 'timers';
import * as io from 'socket.io-client';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  public instruction: any = "Press start test button to continue";
  //others
  router: Router;
  socket: any;
  http: any;

  public socketID: any;

  public currentTestID: String = '';

  public isTestDone: boolean = false;

  public testType: string = ""; // temp , bp, ecg , emg


  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Series B' },
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(_router: Router, _http: HttpService) {
    this.router = _router;
    this.socket = io('http://localhost:7000');
    this.http = _http;
    let _base = this;
    if (localStorage.getItem(_base.router.url.split('/')[2]) != undefined || localStorage.getItem(_base.router.url.split('/')[2]) != null) {
      _base.currentTestID = localStorage.getItem(_base.router.url.split('/')[2]);
    }
  }

  startTest() {

    this.testType = this.router.url.split('/')[2];
    let _base = this;

    switch (this.testType) {
      case 'temp':
        _base.instruction = "Getting temperature";
        _base.tempTimer(5)
          .then(function () {
            _base.instruction = "Please wait . . .";
            _base.socket.emit('start', { status: 'temperature' });
          });
        break;
      case 'bp':
        _base.instruction = "Getting B.P data";
        _base.tempTimer(5);
        break;
      case 'gsr':
        _base.instruction = "Getting G.S.R data";
        _base.tempTimer(5)
        .then(function () {
            _base.instruction = "Please wait . . .";
            _base.socket.emit('start', { status: 'gsr' });
          });
        break;
      case 'glucose':
        _base.instruction = "Getting glucose data";
        _base.tempTimer(5)
          .then(function () {
            _base.instruction = "Please wait . . .";
            _base.socket.emit('start', { status: 'glucose' });
          });
        break;
      default:
        console.log("abc");
        break;
    }
  }

  tempTimer(counttime) {
    return new Promise(function (resolve, reject) {
      let bar = <HTMLElement>document.getElementById('tempbar');
      bar.style.width = 0 + "%";
      let time = 0;
      let progress = 0;
      let totaltime = counttime;
      let totlaprogress = 100;
      let interval = setInterval(function () {
        time++;
        console.log(time);
        progress = progress + (totlaprogress / totaltime);
        console.log(progress);
        bar.style.width = progress + "%";
        if (time == totaltime) {
          clearInterval(interval);
          console.log("Interval ended");
          resolve(true);
        }
      }, 1000);
    });
  }

  // socket subscriber
  ngOnInit() {
    let _base = this;

    _base.socketID = _base.socket.on("value", function (data) {
      let value = data.value;
      let status = data.status;
      _base.render(status, value);
      let sensorData = {

      };

      switch (status) {
        case 'temperature':
          sensorData = {
            time: localStorage.getItem("session"),
            id: localStorage.getItem("userid"),
            temperature: value
          }
          _base.saveTestData(sensorData);
          break;
        case 'bp':
          break;
        case 'emg':
          break;
        case 'gsr':
          let data = value.split("A");
          sensorData = {
            time: localStorage.getItem("session"),
            id: localStorage.getItem("userid"),
            gsr: {
                    conductance:data[0],
                    resistance:data[1],
                    conductanceVol:data[2]            
            },
            tempId: _base.currentTestID
          }
          _base.saveTestData(sensorData);
          break;
        default:
          console.log("abc");
          break;
      }

    });
  }

  public push(data): void {
    console.log("data Push");
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    _lineChartData[0] = { data: new Array(this.lineChartData[0].data.length + 1), label: this.lineChartData[0].label };
    _lineChartData[0].data = this.lineChartData[0].data;
    _lineChartData[0].data.push(data);
    this.lineChartLabels.push(new Date().getTime());
    this.lineChartData = _lineChartData;
  }

  public reset() {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length - this.lineChartData.length);
    _lineChartData[0] = { data: new Array(this.lineChartData[0].data.length - this.lineChartData[0].data.length), label: this.lineChartData[0].label };
    // _lineChartData[0].data = this.lineChartData[0].data;
    _lineChartData[0].data = [];
    let _lineChartLabel: Array<any> = new Array(this.lineChartLabels.length - this.lineChartLabels.length);
    this.lineChartData = _lineChartData;
  }

  public render(type: string, data: any) {
    let _base = this;
    if (type == 'temperature') {
      _base.instruction = "Current " + type + " is : " + data + " ° C or " + this._temp_cTof(data) + "  ° F";
    } else if (type == 'glucose') {
      _base.instruction = "Current " + type + " value is : " + data + " p.p.m";
    }
  }

  public _temp_cTof(celsius) {
    // parseFloat
    return celsius * 9 / 5 + 32;
  }

  saveTestData(sensorData: any) {
    let _base = this;
    // _base.retryTest();

    _base.http.sendDataTOLocalDB(sensorData)
      .then(function (success) {
        if (!success.error) {
          // console.log("last test id", success.Details.bodyTemparature[0]._id);
          // _base.currentTestID = success.Details.data[0]._id;
          // _base.currentTestID = success.Details.value[success.Details.value.length - 1].data[0]._id;
          // localStorage.setItem(_base.testType, _base.currentTestID.toString());
          alert("Data saved");
          _base.isTestDone = true;
          _base.retryTest();
        }
      }, function (error) {
        console.log("Error saving data");
        _base.isTestDone = true;
        _base.retryTest();
      });
  }

  dashboardPage() {
    this.router.navigate(['/dashboard', localStorage.getItem("phone")]);
    let _base = this;
    _base.socket.off('value');
  }

  retryTest() {
    let _base = this;
    _base.testType = "";
    _base.instruction = "Press start test button to retry";
  }

}
