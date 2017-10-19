import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BackgroundMode } from '@ionic-native/background-mode';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timestamps: string[] = [];

  requestor: any;

  constructor(public navCtrl: NavController, private http: Http, private backgroundMode: BackgroundMode) {
    this.backgroundMode.enable();
    this.timestamps = [];

    const body = { name: 'Brad' };
    let i = 0;

    setInterval(() => {
      this.requestor = this.http.post('http://razrgen.razrlab.com:8081/test/log', JSON.stringify(body));
      this.requestor  
        .map(res => res.json())
        .subscribe(data => {
          console.log('my data: ', data);
          console.log(++i);
          this.timestamps.push((new Date).toLocaleString());
          console.log('came here');
        })
    }, 5000);
  }

}
