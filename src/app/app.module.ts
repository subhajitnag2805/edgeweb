import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';  //<<<< import it here
import { ChartsModule } from 'ng2-charts';
import { HttpService } from './http.service';

//route configuartion
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'test/:type', component: TestComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,

    // router module
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
