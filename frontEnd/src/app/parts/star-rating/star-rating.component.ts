import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.less']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating!: number;
  @Input() starWidth!: number;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

 

  ngOnChanges(): void {
    //this.starWidth = this.rating * 75 / 5;
  }

  checkedStar(icon: any): void {
   // console.log(icon);
    this.rating = icon;
    this.ratingClicked.emit(this.rating);
    this.starWidth = this.rating * 118 / 5;
    console.log(this.starWidth,'px')
  }
}