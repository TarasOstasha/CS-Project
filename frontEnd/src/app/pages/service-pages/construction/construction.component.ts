import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

import { pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';



declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.less']
})
export class ConstructionComponent implements OnInit {
  bookingType: string = 'commercial'; 
  public myReviewsArr: any = [];


  servicesCheckbox: any = {
    bathroom: {
      items: [
        { title: 'Toilet cleaned, inside/outside' },
        { title: 'Sink disinfected and cleaned' },
        { title: 'Sink chrome polished' },
        { title: 'Mirror cleaned and polished' },
        { title: 'Countertops disinfected and cleaned' },
        { title: 'Window sills dusted' },
        { title: 'Door handles wiped' },
        { title: 'Light switches wiped' },
        { title: 'Baseboards dusted' },
        { title: 'Floor Swept & Mopped' },
        { title: 'Wastebasket emptied/relined' },
        { title: 'Refill hand soap and paper towels' },
        { title: 'Restock toilet paper' },
        { title: 'Help reorder/buy supplies' },
      ]

    },
    kitchen: {
      items: [
        { title: 'Sink cleaned' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Microwave inside/outside cleaned' },
        { title: 'Fridge outside / inside cleaned' },
        { title: 'Coffee maker / toaster wiped' },
        { title: 'Dishwasher outside cleaned' },
        { title: 'Table and chairs wiped' },
        { title: 'Floor swept / mopped' },
        { title: 'Wastebasket emptied/relined' },
        { title: 'Replace paper towels' },
      ]

    },
    generalOffice_area: {
      items: [
        { title: 'Computer monitors wiped' },
        { title: 'Furniture dusted / polished' },
        { title: 'Doors cleaned' },
        { title: 'Cobwebs remove' },
        { title: 'Window sills dusted' },
        { title: 'Light fixtures dusted' },
        { title: 'Blinds dusted' },
        { title: 'Baseboards dusted' },
        { title: 'Floors vacuumed / mopped' },
        { title: 'Stairs vacuumed / mopped' },
        { title: 'Wastebasket emptied/relined' },
      ]

    },
    entranceReception_area: {
      items: [
        { title: 'Computer monitors wiped' },
        { title: 'Furniture dusted / polished' },
        { title: 'Doors cleaned' },
        { title: 'Cobwebs remove' },
        { title: 'Window sills dusted' },
        { title: 'Light fixtures dusted' },
        { title: 'Blinds dusted' },
        { title: 'Baseboards dusted' },
        { title: 'Floors vacuumed / mopped' },
        { title: 'Stairs vacuumed / mopped' },
        { title: 'Wastebasket emptied/relined' }
      ]

    },
    doctorsOffice: {
      items: [
        { title: 'Sinks cleaned' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Exam tables cleaned' },
        { title: 'Floors sweep / mop / disinfect' },
        { title: 'Supplies replenished' }
      ]

    }
  }

  extraServices: any = [
    { title: 'Fridge inside/outside', price: 30 },
    { title: 'Oven inside/outside', price: 30 },
    { title: 'Cabinets inside/outside', price: 30 },
    { title: 'Garbage can inside/outside', price: 30 },
    { title: 'Windows inside', price: 30 / 5 },
    { title: 'Baseboards', price: 30 },
    { title: 'Vacuum Sofa', price: 30 },
    { title: 'Laundry', price: 30 },
    { title: 'Move in/out Package', price: 140 },
    { title: 'Organic Cleaning', price: 30 }
  ]

  quickBook: any = {
    approx_SF: {
      items: [
        { title: 'Under 1000' },
        { title: '1000 - 1200' },
        { title: '1200 - 1500' },
        { title: '1500 - 2000' },
        { title: '2000 - 2500' },
        { title: '2500 - 3000' },
        { title: '3000 - 3500' },
      ]
    },
    bedrooms: {
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
      ]
    },
    bathrooms: {
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
      ]
    },
    frequency: {
      items: [
        { title: 'Weekly', color: '#1976d2', price: 123 }, // MATERIAL COLORS: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=1976D2
        { title: 'Biweekly', color: '#c62828', price: 139 },
        { title: 'Monthly', color: '#c43e00', price: 156 },
        { title: 'One Time', color: '#2e7d32', price: 160 },
      ]
    },
    zip_code: '',
    email: '',
    phone: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _form: FormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initReviewsCarousel();
    }, 500)
    this.getMyReview();
  }


  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
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
      slidesToScroll: 2,
      autoplaySpeed: 5000,
      mobileFirst: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }



}
