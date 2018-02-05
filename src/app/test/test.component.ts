import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { setTimeout, clearInterval } from 'timers';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public instruction: any = "Press start test button to continue";
  //others
  router: Router;

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

  constructor(_router: Router) {
    this.router = _router;
  }

  startTest() {
    this.testType = this.router.url.split('/')[2];
    let _base = this;

    switch (this.testType) {
      case 'temp':
        _base.instruction = "Getting temperature";
        _base.tempTimer(50);
        break;
      case 'bp':
        _base.instruction = "Getting B.P data";
        _base.tempTimer(5);
        break;
      case 'emg':
        _base.instruction = "Getting E.M.G data";
        _base.tempTimer(5);
        break;
      case 'ecg':
        _base.instruction = "Getting E.C.G data";
        _base.tempTimer(5);
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
          resolve(true);
        }
      }, 1000);
    });
  }

  ngOnInit() {

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

}
