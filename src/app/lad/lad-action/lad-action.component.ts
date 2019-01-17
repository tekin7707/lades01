import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LadService } from 'app/services/lad.service';
import { AuthService } from 'app/services/auth.service';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-lad-action',
  templateUrl: './lad-action.component.html',
  styleUrls: ['./lad-action.component.scss']
})
export class LadActionComponent implements OnInit {
  id: string = '';
  loading: boolean = false;
  ladAll = {
    lad: { _id: '', userId: '', ladValue: 100, oneLadMin: 1, oneLadMax: 100, name: 'Test', caption: 'Test', startDate: new Date(), endDate: new Date() },
    ladItems: []
  };
  ladAction = {value:0};
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private router: Router,
    private ladService: LadService,
    private authService: AuthService

  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log('%s ', this.id);
    });

  }

  ngOnInit() {
    this.getLad();
  }

  async getLad() {
    this.loading = true;
    let r = await this.ladService.getLadForAction(this.id);
    if (r.status == 200) {
      this.ladAll = r.data.data;
      console.log(r);
      this.loading = false;
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log(r);
    }
  }

  selectRow(li){

  }

  selectThis(){

  }

}
