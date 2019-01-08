import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/dataModel';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User;
  loading:boolean=false;
  constructor(
    private router: Router,
    private authService:AuthService) {
    this.user = this.authService.getLoginUser(); 
    console.log(this.user);
    
   }

  ngOnInit() {
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

  async update(){
    this.loading=true;
    let r = await this.authService.update(this.user);
    this.loading=false;
    if (r.status == 200) {
      this.user = r.data;
      console.log(r);
      this.showNotification('success', 'Updated successfully');
    }
    else {
      this.showNotification('danger', r.message["errmsg"]);
      console.log(r);
    }
  }

  async getUserList(){
    let a = await this.authService.getUserList(1);
    console.log(a);
    
  }

}
