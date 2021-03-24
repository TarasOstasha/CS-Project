import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.less']
})
export class OfficeComponent implements OnInit {
  public myReviewsArr: any = [];
  servicesCheckbox: any = {
    bathroom: {
      items: [
        { title: 'Toilet cleaned, inside/outside', icon: 'f00c' },
        { title: 'Sink cleaned' },
        { title: 'Bathroom accessories wiped' },
        { title: 'Tile area cleaned' },
        { title: 'Tub cleaned' },
        { title: 'Shower door/shower curtain tidy' },
        { title: 'Mirror cleaned and polished' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Cabinets outside cleaned' },
        { title: 'Window sills dusted' },
        { title: 'Cobwebs removed' },
        { title: 'Floor swept/mopped' },
        { title: 'Wastebasket emptied/relined' }
      ]
    },
    kitchen: {
      items: [
        { title: 'Sink cleaned' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Stove top cleaned' },
        { title: 'Microwave inside/outside cleaned' },
        { title: 'Appliances outside cleaned' },
        { title: 'Range hood outside cleaned' },
        { title: 'Cobwebs removed' },
        { title: 'Floor swept/mopped' },
        { title: 'Wastebasket emptied/relined' }
      ]

    },
    bedrooms: {
      items: [
        { title: 'Beds made, linens changed' },
        { title: 'Lamps shades dusted' },
        { title: 'Furniture dusted' },
        { title: 'Pictures dusted' },
        { title: 'Window sills dusted' },
        { title: 'Mirrors cleaned' },
        { title: 'Under the bed swept' },
        { title: 'Cobwebs removed' },
        { title: 'Floor swept/mopped/vacuumed' },
        { title: 'Wastebasket emptied/relined' }
      ]

    },
    living: {
      items: [
        { title: 'Window sills dusted' },
        { title: 'Furniture dusted' },
        { title: 'Lamps shades dusted' },
        { title: 'Mirrors cleaned' },
        { title: 'Cobwebs removed' },
        { title: 'Banister wiped' },
        { title: 'Stairs swept/mopped/vacuumed' },
        { title: 'Floor swept/mopped/vacuumed' },
        { title: 'Wastebasket emptied/relined' }
      ]

    }
  }

  extraServices: any = [
    { title: 'Fridge inside/outside', price: 30 },
    { title: 'Oven inside/outside', price: 30 },
    { title: 'Cabinets inside/outside', price: 30 },
    { title: 'Garbage can inside/outside', price: 30 },
    { title: 'Windows inside', price: 30/5 },
    { title: 'Baseboards', price: 30 },
    { title: 'Vacuum Sofa', price: 30 },
    { title: 'Laundry', price: 30 },
    { title: 'Move in/out Package', price: 140 },
    { title: 'Organic Cleaning', price: 30 }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initReviewsCarousel();
    }, 500)
    // this.experienceForm = this._formBuilder.group({
    //   experience: ['', Validators.required],
    //   name: ['', [Validators.required, Validators.minLength(2)]],
    //   myTextArea: ['', [Validators.required, Validators.minLength(20)]]
    // });
    this.getMyReview();
  }

  // get all reviews from the server
  getMyReview() {
    this._api.getReviews()
      .pipe(
        map((review: any) => {
          return review.reviews;
        })
      )
      .subscribe((response) => {
        this.myReviewsArr = response;
        //console.log(this.myReviewsArr)
      })
  }

  // init our reviews carousel
  initReviewsCarousel() {
    $('.slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      mobileFirst: true,
      adaptiveHeight: true
    });
  }

}
