import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { pipe, of, fromEvent, Subject, Observable } from 'rxjs';
import { debounceTime, map, filter, switchAll, distinctUntilChanged } from 'rxjs/operators';
import { FilterPipe } from '../../pipes/search.pipe';
import {  Router } from '@angular/router';

import { saveAs } from 'file-saver'; // file saver for email

declare var $: any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],

})
export class AdminComponent implements OnInit {
  p: number = 1; // for npx pagination
  p2: number = 1; // for second pagination
  config: any; // for npx pagination (not using right now)

  searchText = ''
  bookings: any = '';
  creditCard: any = '';
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private _searchSubject: Subject<string> = new Subject(); // create search Subject

  constructor(public _api: ApiService, private _router: Router) {
    this._setSearchSubscription();
    // one method for npx pagination(ajust config in ts file)
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: setTimeout(()=>{this.bookings.booking.length; this.creditCard.creditCardInfo.length },1000) 
    };
  }

  public updateSearch(event: any) {
    this._searchSubject.next(event.target.value);
  }
  copyObj: any;
  filteredProduct: any;
  private _setSearchSubscription() {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe(async (searchValue: string) => {
      console.log(searchValue)
      // Filter Function
      this.filteredProduct = this.filteredProduct.filter((item: any) => {
        console.log(item.name,'-item name', searchValue,'value from input')
        return item.name == searchValue.toLowerCase();
      }
      );
      if (this.filteredProduct.length === 0) { // check if length of product == 0
        return this.filteredProduct = this.bookings.booking; // rerender view
      }

    });
  }

  ngOnDestroy() {
    this._searchSubject.unsubscribe();
  }


  pageChanged(event:any){
    this.config.currentPage = event;
  }
  

  async ngOnInit() {
    this.bookings = await this._api.getBookingData(); // main object from server
    this.filteredProduct = this.bookings.booking;
    //console.log(this.bookings.booking.length)
    this.creditCard = await this._api.getCardInfo(); // get all credit card info
    console.log(this.creditCard)
  }

  async getUserData() {
    return await this._api.getBookingData(); // main object
  }


  async saveAllEmails() {
    const emailsFromServer: any = this._api.myEmails();
    const result = await emailsFromServer;
    console.log(result);
    var blob = new Blob(result.savedEmails, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "savedEmails.txt");
    // for(const value of this.bookings.booking) {
    //   console.log( value.email)
    // }
  }



  logOut() { // logout from admin panel
    localStorage.removeItem('state');
    this._router.navigate(['main']); 
  }




}
