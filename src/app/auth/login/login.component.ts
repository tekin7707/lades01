import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthService } from 'app/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'app/models/dataModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = true;
  returnUrl: string;
  loggedUser: User;
  email: string = '';
  password: string = '';
  loginError = '';
  emailError = '';
  passwordError = '';

  showModal = false;

  constructor(private authService:AuthService ,private route: ActivatedRoute, private router : Router) {

   }

  ngOnInit() {
  }

  async login(form: NgForm){
    this.email = form.value.email;
    this.password = form.value.password;
    let r = await this.authService.login(this.email, this.password);
    console.log(r);
    this.router.navigate(['dashboard']);
  }
}
