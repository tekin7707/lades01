import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthService } from 'app/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'app/models/dataModel';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:boolean=false;
  isLoading: boolean = true;
  returnUrl: string;
  loggedUser: User;
  email: string = '';
  password: string = '';
  loginError = '';
  emailError = '';
  passwordError = '';
  user:User;
  showModal = false;

  constructor(private location: Location,private authService:AuthService ,private route: ActivatedRoute, private router : Router) {
    console.log(location);
    this.user = this.authService.getLoginUser();
    if(this.user) this.router.navigate(['dashboard']);
  }

  ngOnInit() {

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

  async login(form: NgForm){
    this.loading=true;
    this.email = form.value.email;
    this.password = form.value.password;
    let r = await this.authService.login(this.email, this.password);
    if (r.status == 200) {
      this.user = r.data;
      console.log(r);
      this.showNotification('success', 'Success');
      this.router.navigate(['dashboard']);
      }
    else {
      this.loading=false;
      this.showNotification('danger', r.message );
      console.log(r);
    }
  }
}
