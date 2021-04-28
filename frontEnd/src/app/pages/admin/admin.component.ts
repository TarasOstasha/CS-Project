import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { pipe, of, fromEvent, Subject, Observable } from 'rxjs';
import { debounceTime, map, filter, switchAll, distinctUntilChanged } from 'rxjs/operators';


declare var $: any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  bookings: any = '';
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private _searchSubject: Subject<string> = new Subject(); // create search Subject

  constructor(public _api: ApiService) {
    this._setSearchSubscription();
  }

  public updateSearch(event: any) {
    this._searchSubject.next(event.target.value);
  }

  myFlag: boolean = false;
  copyObj:any;
  private _setSearchSubscription() {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      console.log(searchValue)
      // Filter Function

      this.bookings.booking = this.bookings.booking.filter( (item:any, index:number) => {
        return item.name == searchValue
      })
      // here create method to return table if value not equal

      // this.bookings.booking.forEach(async (item: any, index: any) => {
      //   if (item.name === searchValue.toLocaleLowerCase()) {
      //     this.myFlag = true;
      //     this.bookings.booking = this.bookings.booking.splice(this.bookings.booking.indexOf(item[index]), 1); // value from input;
      //     //console.log(this.bookings.booking, this.bookings2.booking,this.myFlag )
      //   }
      //   else if (item.name !== searchValue.toLocaleLowerCase()) {
      //     this.myFlag = false;
      //     //this.copyObj.push(currentValue);
      //     //this.bookings.booking = [...this.copyObj]; // paste copy obj to main obj
      //     //console.log(this.copyObj)
      //   }
      // })

    });
  }

  ngOnDestroy() {
    this._searchSubject.unsubscribe();
  }

  bookings2: any;
  async ngOnInit() {
    this.bookings = await this._api.getBookingData(); // main object

    //this.bookings2 = await this._api.getBookingData(); // second obj for search method
    //this.copyObj = Object.assign(this.bookings2.booking); // copy data from server to object to return back value when search value not equal to input value
    //console.log(this.bookings.booking)
  }


  async saveAllEmails() {
    const emailsFromServer: any = this._api.myEmails();
    console.log(emailsFromServer);
    // for(const value of this.bookings.booking) {
    //   console.log( value.email)
    // }
  }


  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
  
  ]


}
