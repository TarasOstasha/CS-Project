import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-our-services-part',
  templateUrl: './our-services-part.component.html',
  styleUrls: ['./our-services-part.component.less'],
  encapsulation: ViewEncapsulation.None // turned off to edit .mat-list-item-content in css mat-list
})
export class OurServicesPartComponent implements OnInit {

  serviceCards = [
    { name: 'regular cleaning', routerLink: ['/regular-cleaning'], img: '../../../assets/images/services/regular-cleaning.jpg' },
    { name: 'Deep Cleaning', routerLink: ['/deep-cleaning'], img: '../../../assets/images/services/deep-cleaning.jpg' },
    { name: 'Organic Cleaning', routerLink: ['/green-cleaning'], img: '../../../assets/images/services/green-cleaning.jpg' },
    { name: 'move Cleaning ', routerLink: ['/move-cleaning'], img: '../../../assets/images/services/move-cleaning.jpg' },
    { name: 'Post Construction Cleaning', routerLink: ['/post-construction'], img: '../../../assets/images/services/post-construction1.jpg' },
    { name: 'post renovation cleaning ', routerLink: ['/post-renovation'], img: '../../../assets/images/services/post-renovation.jpg' },
    { name: 'Office Cleaning ', routerLink: ['/office-cleaning'], img: '../../../assets/images/services/office-cleaning.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
