import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  serviceCards = [
    { name: 'regular cleaning', routerLink: ['/regular-cleaning'], img: '../../../assets/images/services/regular-cleaning.jpg' },
    { name: 'Deep Cleaning', routerLink: ['/deep-cleaning'], img: '../../../assets/images/services/deep-cleaning.jpg' },
    { name: 'move Cleaning ', routerLink: ['/move-cleaning'], img: '../../../assets/images/services/move-cleaning.jpg' },
    { name: 'Post Construction Cleaning', routerLink: ['/post-construction'], img: '../../../assets/images/services/post-construction.jpg' },
    { name: 'post renovation cleaning ', routerLink: ['/post-renovation'], img: '../../../assets/images/services/post-renovation.jpg' },
    { name: 'Office Cleaning ', routerLink: ['/office-cleaning'], img: '../../../assets/images/services/office-cleaning.jpg' }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
