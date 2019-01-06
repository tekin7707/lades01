import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/dataModel';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User;
  constructor(private authService:AuthService) {
    this.user = this.authService.getLoginUser(); 
    console.log(this.user);
    
   }

  ngOnInit() {
  }

  async getUserList(){
    let a = await this.authService.getUserList(1);
    console.log(a);
    
  }

}
