import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Review } from '../interfaces/review-data.model';
import { officeBookForm } from '../interfaces/officeBookForm-data.model';

if(location.hostname == 'localhost') var url = 'http://localhost/'; //dev
else var url = ''; //production

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private url = 'http://localhost:3000/';
  //private url = '';
  officeFormData: any = {};

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
    return this._http.post( url + 'sendmail', this.officeFormData ).subscribe(response => {
      console.log(response);
    });
  }



}
