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
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.less']
})
export class OfficeComponent implements OnInit {
  public myReviewsArr: any = [];
  businessBookForm!: FormGroup;

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
    this.businessBookForm = this._formBuilder.group({
      company_name: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ,Validators.pattern('^[0-9]*$')]],
      approx_SF: ['', [Validators.required]],
      frequency: ['', [Validators.required]]
    });
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
      slidesToScroll: 2,
      autoplaySpeed: 5000,
      mobileFirst: true,
      adaptiveHeight: true,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true
        }
   
      }, {
   
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true
        }
   
      }, {
   
        breakpoint: 300,
        settings: "unslick" // destroys slick
   
      }]
    });
  }

  sendBusinessForm() {
    this._form.sendBusinessDataForm(this.businessBookForm.value);
    this.router.navigate(['/booking']);
  }

}
