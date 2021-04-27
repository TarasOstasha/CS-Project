import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  bookings: any = '';
  
  
  constructor(public _api: ApiService) { }

  async ngOnInit() {
    this.bookings = await this._api.getBookingData();
    console.log(this.bookings.booking)
  }


  async saveAllEmails() {
    const emailsFromServer: any = this._api.myEmails();
    console.log(emailsFromServer);
    // for(const value of this.bookings.booking) {
    //   console.log( value.email)
    // }
  }


}
