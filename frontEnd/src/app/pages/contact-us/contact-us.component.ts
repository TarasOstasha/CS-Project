import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


declare var $: any;
declare var jQuery: any;

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {
  experienceForm!: FormGroup;
  @Input() starRating: any;
  @Input() starWidth!: number;
  rating!: number;
  clickedBtn: boolean = false;
  panelOpenState: boolean = false;
  public myReviewsArr: any = [];
  public reviews = [
    { title: ' "Lorem ipsum dolor1..." ', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis voluptas odit consectetur necessitatibus suscipit libero nam porro hic, cumque quos, aspernatur voluptatem laboriosam modi voluptatum nesciunt deleniti repellat error doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.', name: 'Jack', rating: 4 },
    { title: ' "Lorem ipsum dolor2..." ', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis voluptas odit consectetur necessitatibus suscipit libero nam porro hic, cumque quos, aspernatur voluptatem laboriosam modi voluptatum nesciunt deleniti repellat error doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.', name: 'Jack', rating: 3 },
    { title: ' "Lorem ipsum dolor3..." ', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis voluptas odit consectetur necessitatibus suscipit libero nam porro hic, cumque quos, aspernatur voluptatem laboriosam modi voluptatum nesciunt deleniti repellat error doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.', name: 'Jack', rating: 4 },
    { title: ' "Lorem ipsum dolor4..." ', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis voluptas odit consectetur necessitatibus suscipit libero nam porro hic, cumque quos, aspernatur voluptatem laboriosam modi voluptatum nesciunt deleniti repellat error doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.', name: 'Jack', rating: 3 }
  ];

  experiences = [
    { value: 'Excellent' },
    { value: 'Good' },
    { value: 'Acceptable' },
    { value: 'Bad' }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initReviewsCarousel();
    }, 500)
    this.experienceForm = this._formBuilder.group({
      experience: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      myTextArea: ['', [Validators.required, Validators.minLength(20)]]
    });
    this.getMyReview();
  }

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

  initReviewsCarousel() {
    $('.slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplaySpeed: 5000,
      mobileFirst: true,
      adaptiveHeight: true
    });
  }

  selectedExperience() {

  }

  onRatingClicked(message: any): void {
    this.starRating = message
    this.clickedBtn = true;
    //rconsole.log(this.starRating)
  }

  checkedStar(icon: any) {
    this.starWidth = icon * 118 / 5;
    //console.log(icon)
    //console.log(this.starWidth, 'px')
  }
  saveReview() {
    //console.log(this.experienceForm.value)
    if (this.experienceForm.invalid && this.experienceForm.value.experience == null || this.experienceForm.value.name == null || this.experienceForm.value.myTextArea == null) {
       this.clickedBtn = false; // after sent review make btn send disabled
    } else if(this.experienceForm.valid) {
      this.clickedBtn = true; // if form valid make a enabled btn send to send new form
    }
    this._api.sendReview(this.experienceForm.value.experience, this.experienceForm.value.name, this.experienceForm.value.myTextArea, this.starRating);
    //this.getMyReview(); // call immediately new reviews but not working because of slick jquery carousel initialize bad
    this.panelOpenState = false; // close review window after submit
    this.experienceForm.reset(); // reset form
    Object.keys(this.experienceForm.controls).forEach(key =>{
      this.experienceForm.controls[key].setErrors(null); // set all value null after submit
    });  
    this.openSnackBar('Review was sent', 'Thank you!'); // show popup message after submit
    this.clickedBtn = false; // move send btn to disabled after submit
  }

  // popup menu after submitted form
  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openPanel() {
    this.panelOpenState = true;
  }
}
