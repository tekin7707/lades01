import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LadService } from 'app/services/lad.service';
import { AuthService } from 'app/services/auth.service';
import { User, ladModel, ladItemModel } from 'app/models/dataModel';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-lad-detail',
  templateUrl: './lad-detail.component.html',
  styleUrls: ['./lad-detail.component.scss']
})
export class LadDetailComponent implements OnInit {
  loading: boolean = false;
  mode: string = '';
  ladItemMode: string = 'browse';
  user: User;
  id: string = '';
  ladItem: ladItemModel = { _id: '', masterId:'', name: '', caption: '', rate: 1, state: 1 };
  silOnay: boolean = false;
  islemCaption: string = "";
  ladAll = {
    lad: { _id: '', ladValue: 100, oneLadMin: 1, oneLadMax: 100, name: 'Test', caption: 'Test', startDate: new Date(), endDate: new Date() },
    ladItems: []
  };

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private router: Router,
    private ladService: LadService,
    private authService: AuthService

  ) {
    console.log('%c --> lad-detail constructor', 'color:orange;');
    dateAdapter.setLocale('tr');
    this.route.params.subscribe(params => {
      this.mode = params["mode"];
      this.id = params["recId"];
      if (this.mode == 'add') {
        this.islemCaption = "Yeni Kayıt";
      }
      else {
        this.id = params["id"];
        this.islemCaption = this.mode == 'del' ? "Kayıt Silinecek !" : "Kayıt Düzenle";
      }
      console.log('%s : %s', this.mode, this.id);
    });
    console.log('%c <-- lad-detail constructor', 'color:orange;');
  }

  ngOnInit() {
    this.user = this.authService.getLoginUser();
    this.getLad();
  }

  async getLad() {
    this.loading = true;
    let r = await this.ladService.getLad(this.id);
    if (r.status == 200) {
      this.ladAll = r.data.data;
      console.log(r);
      this.authService.showNotification('success', 'Success');
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log(r);
    }
  }

  run() {

  }

  prepareLadItemEdit(_ladItem) {
    this.ladItemMode = 'edit';
    this.ladItem = _ladItem;
  }

  prepareLadItemDelete(_ladItem) {
    this.ladItemMode = 'delete';
    this.ladItem = _ladItem;
  }

  prepareLadItemInsert(_ladItem) {
    this.ladItemMode = 'insert';
    this.ladItem = { masterId:this.ladAll.lad._id, _id: '', name: '', caption: '', rate: 1, state: 0 };
  }

  resetItem() {
    this.ladItem = { _id: '', masterId:'', name: '', caption: '', rate: 1, state: 0 };
    this.ladItemMode = 'browse';
  }

  runItem() {
    if (this.ladItemMode == 'insert') {
      this.insertLadItem();
    } else if (this.ladItemMode == 'edit') {
      this.updateLadItem();
    } else if (this.ladItemMode == 'delete') {
      this.deleteLadItem();
    }
  }

  async insertLadItem() {
    console.log('insertLadItem');
    this.loading = true;
    let r = await this.ladService.insertLadItem(this.ladItem);
    if (r.status == 200 || r.status == 201 ) {
      this.ladAll.ladItems.push(r.data.data);
      console.log('insertLadItem %c inserted Data -->', 'color:green;');
      console.log(r);
      this.authService.showNotification('success', 'Success');
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log('insertLadItem %c Error -->', 'color:red;');
      console.log(r);
    }
  }

  async updateLadItem() {
    console.log('updateLadItem');
    this.loading = true;
    let r = await this.ladService.updateLadItem(this.ladItem);
    if (r.status == 200) {
      console.log('updateLadItem %c Updated Data -->', 'color:green;');
      console.log(r);
      this.authService.showNotification('success', 'Success');
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log('updateLadItem %c Error -->', 'color:red;');
      console.log(r);
    }
  }

  async deleteLadItem() {
    console.log('deleteLadItem');
    this.loading = true;
    let r = await this.ladService.deleteLadItem(this.ladItem._id);
    if (r.status == 200) {
      console.log('deleteLadItem %c Deleted Data -->', 'color:green;');
      console.log(r);
      let lii = this.ladAll.ladItems.findIndex(x => x._id == this.ladItem._id);
      if (lii > -1) {
        this.ladAll.ladItems.splice(lii, 1);
        this.authService.showNotification('success', 'Success');
      }
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log('deletedLadItem %c Error -->', 'color:red;');
      console.log(r);
    }
  }


}
