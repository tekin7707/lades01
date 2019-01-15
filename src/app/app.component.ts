import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
declare var device;
declare var navigator;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  name: string;
  constructor(private _r: Router) {
    this.name = 'Angular2'

    this._r.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.name = event.url;
        // console.log('navigated to:', event.url);
        // console.log('route state', event.state);
        // console.log('');
      }
      else if (event instanceof NavigationEnd) {
        // console.log('NavigationEnd');
        // console.log(event);
      }
    });
  }

  showNotification(type, message) {
    $.notify({
      icon: "notifications",
      message: message
    }, {
        type: type,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  ngOnInit() {
    console.log('--> appComponent init');
    document.addEventListener("deviceready", function () {
      console.log('deviceready');
      console.log(device.platform);
    }, false);

    document.addEventListener("backbutton", function (e) {
      console.log('backbutton');
      // alert(this.name);
      if (this.name == '/dashboard') {
        // e.preventDefault();
        navigator.app.exitApp();
      }
      else {
        navigator.app.backHistory();
      }
    }, false);

    console.log('<-- appComponent init');
  }
}