import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../services/api.service';


declare var $: any;
declare var jQuery: any;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  //@Input() slides: any;
  experienceForm!: FormGroup;
  @Input() starRating: any;
  @Input() starWidth!: number;
  rating!: number;


  serviceCards = [
    { name: 'regular cleaning', routerLink: ['/regular-cleaning'], img: '../../../assets/images/services/regular-cleaning.jpg' },
    { name: 'Deep Cleaning', routerLink: ['/deep-cleaning'], img: '../../../assets/images/services/deep-cleaning.jpg' },
    { name: 'move Cleaning ', routerLink: ['/move-cleaning'], img: '../../../assets/images/services/move-cleaning.jpg' },
    { name: 'Post Construction Cleaning', routerLink: ['/post-construction'], img: '../../../assets/images/services/post-construction1.jpg' },
    { name: 'post renovation cleaning ', routerLink: ['/post-renovation'], img: '../../../assets/images/services/post-renovation.jpg' },
    { name: 'Office Cleaning ', routerLink: ['/office-cleaning'], img: '../../../assets/images/services/office-cleaning.jpg' }
  ];


  // reviews carousel - https://www.npmjs.com/package/@ngmodule/material-carousel
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
    private _api: ApiService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initReviewsCarousel();
    })
    this.experienceForm = this._formBuilder.group({
      experience: ['', Validators.required],
      name: ['', [Validators.required, Validators.min(2)] ],
      myTextArea: ['', [Validators.required, Validators.min(20)] ]
    });
  }

  saveReview() {
    console.log(this.experienceForm.value)
  }

  initReviewsCarousel() {
    $('.slider').slick({
      infinite: true,
      //autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplaySpeed: 5000,
      mobileFirst: true
    });
  }

  selectedExperience() {

  }

  onRatingClicked(message: any): void {
    this.starRating = message
    console.log(this.starRating)
  }

  checkedStar(icon: any) {
    this.starWidth = icon * 118 / 5;
    console.log(icon)
    console.log(this.starWidth, 'px')
  }
  

}
