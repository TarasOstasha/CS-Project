import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Review } from '../interfaces/review-data.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000/';


  constructor(private _http: HttpClient) { }
  

  sendReview(grade: string, name: string, message: string, star: number) {
    const reviewData: Review = { grade: grade, name: name, message, star: star };
    console.log(reviewData)
    this._http.post( this.url + 'review', reviewData )
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
    return this._http.get( this.url + 'review' );
  }






}
