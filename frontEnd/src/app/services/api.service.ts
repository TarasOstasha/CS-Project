import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Review } from '../interfaces/review-data.model';
import { officeBookForm } from '../interfaces/officeBookForm-data.model';
import { businessBookForm } from '../interfaces/businessForm-data.model';
import { bookingData } from '../interfaces/booking-data.model';

if(location.hostname == 'localhost') var url = 'http://localhost/'; //dev
else var url = '/'; //production

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private url = 'http://localhost:3000/';
  //private url = '';
  officeFormData: any = {};
  businessFormData: any = {};

  constructor(private _http: HttpClient) { }
  

  sendReview(grade: string, name: string, message: string, star: number) {
    const reviewData: Review = { grade: grade, name: name, message, star: star };
    console.log(reviewData)
    //this._http.post( this.url + 'review', reviewData )
    this._http.post( url + 'review', reviewData )
      .subscribe(response => {
        console.log(response);
      })
  }

  // getReviews() {
  //   this._http.get( this.url + 'review' ).subscribe(response => {
  //     console.log(response);
  //     return response;
  //   });
  // }

  getReviews() {
    //return this._http.get( this.url + 'review' );
    return this._http.get( url + 'review' );
  }


  sendOfficeDataForm(value: officeBookForm) {
    console.log(value);
    this.officeFormData = value;
    return this._http.post( url + 'sendmail-forms', this.officeFormData );
    //return this._http.post( url + 'sendmail', this.officeFormData );
  }

  sendBusinessDataForm(value: officeBookForm) {
    console.log(value);
    this.businessFormData = value;
    return this._http.post( url + 'sendmail-forms', this.businessFormData );
    //return this._http.post( url + 'sendmail', this.businessFormData );
  }

  sendMainBookingDataForm(value) {
    return this._http.post( url + 'sendmail', value );
  }

  sendBookingData(data: bookingData) {
    return this._http.post( url + 'booking-data', data )
  }

  getBookingData() {
    return this._http.get(url + 'booking-data').toPromise();
    //   .subscribe(response => {
    //   console.log(response);
    // })
  }

  myEmails() {
    return this._http.get(url + 'emails').toPromise();
  }


  sendDate(bookingDate: any) {
    return this._http.post( url + 'date', bookingDate );
  }

  sendTestDate(bookingDate: any) {
    return this._http.post( url + 'test-date', bookingDate );
  }
  
  // send card validation
  sendCardValidation(cardData) {
    return this._http.post( url + 'credit-card', cardData);
  }

  getCardInfo() {
    return this._http.get( url + 'credit-card' ).toPromise();
  }
}
