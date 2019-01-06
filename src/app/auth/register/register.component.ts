import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/dataModel';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  email: string = '';
  password1 = '';
  password2 = '';
  emailError = '';
  passwordError = '';
  registerError = '';
  password1Error = '';
  password2Error = '';

  constructor(
    private router: Router,
    private authService: AuthService) { }

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
  }


  async register() {
    this.emailError = '';
    this.passwordError = '';
    this.registerError = '';
    this.password1Error = '';
    this.password2Error = '';

    let _e = this.authService.emailCheck(this.email);
    let _p = this.authService.passwordCheck(this.password1);

    if (_e != this.email) {
      this.emailError = _e;
      this.registerError = 'Please fill out all fields marked in red.';
    }

    if (_p == '') {
      if (this.password1 != this.password2) {
        this.password2Error = 'Please confirm your password';
      }
    } else {
      this.password1Error = _p;
      this.registerError = 'Please fill out all fields marked in red.';
    }

    if (this.registerError == '') {
      let user: User = { email: this.email, password: this.password1 };

      let r = await this.authService.register(user);
      if (r.status == 201) {
        this.user = r.data;
        console.log(r);
        this.showNotification('success', 'Registered successfully');
        this.router.navigate(['login']);
      }
      else {
        this.showNotification('danger', r.message);
        console.log(r);
      }
    }
  }

}
