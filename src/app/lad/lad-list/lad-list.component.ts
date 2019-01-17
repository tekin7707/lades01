import { Component, OnInit } from '@angular/core';
import { LadService } from 'app/services/lad.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { User, ladModel } from 'app/models/dataModel';
declare var $: any;

@Component({
  selector: 'app-lad-list',
  templateUrl: './lad-list.component.html',
  styleUrls: ['./lad-list.component.scss']
})
export class LadListComponent implements OnInit {
  loading:boolean=false;
  user:User;
  lads:ladModel[]=[];

  constructor(
    private route:Router,
    private ladService:LadService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getLoginUser();
    this.getMyLads();
  }

  showNotification(type, message) {
    $.notify({
      icon: "notifications",
      message: message
    }, {
        type: type,
        timer: 1000,
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

  async getMyLads(){
    this.loading=true;
    let r = await this.ladService.getMyLads();
    if (r.status == 200) {
      this.lads = r.data.data;
      console.log(r);
      // this.showNotification('success', 'Success');
      setTimeout(() => {
        this.loading=false;
      }, 100);
      }
    else {
      this.loading=false;
      this.showNotification('danger', r.message );
      console.log(r);
    }
  }

  
}
