import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meve',
  templateUrl: './meve.component.html',
  styleUrls: ['./meve.component.less']
})
export class MeveComponent implements OnInit {
  servicesCheckbox: any = {
    bathroom: {
      items: [
        { title: 'Toilet cleaned, inside/outside' },
        { title: 'Sink cleaned' },
        { title: 'Bathroom accessories wiped' },
        { title: 'Cabinets inside/outside cleaned' },
        { title: 'Tile area scrubbed' },
        { title: 'Tub cleaned' },
        { title: 'Shower door/shower curtain tidy' },
        { title: 'Mirror cleaned' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Window sills dusted' },
        { title: 'Cobwebs removed' },
        { title: 'Door handles wiped' },
        { title: 'Light switches wiped' },
        { title: 'Top of door frames dusted' },
        { title: 'Floor swept/mopped' },
        { title: 'Wastebasket emptied' }
      ]
    },
    kitchen: {
      items: [
        { title: 'Sink cleaned' },
        { title: 'Chrome polished' },
        { title: 'Countertops cleaned' },
        { title: 'Tile area scrubbed' },
        { title: 'Stove top cleaned' },
        { title: 'Fridge inside/outside cleaned' },
        { title: 'Oven inside/outside cleaned' },
        { title: 'Cabinets inside/outside cleaned' },
        { title: 'Microwave inside/outside cleaned' },
        { title: 'Appliances outside cleaned' },
        { title: 'Range hood outside cleaned' },
        { title: 'Cobwebs removed' },
        { title: 'Door handles wiped' },
        { title: 'Light switches wiped' },
        { title: 'Top of door frames dusted' },
        { title: 'Floor swept/mopped' },
        { title: 'Wastebasket emptied' },

      ]
    },
    bedrooms: {
      items: [
        { title: 'Closets inside' },
        { title: 'Window sills dusted' },
        { title: 'Mirrors cleaned' },
        { title: 'Cobwebs removed' },
        { title: 'Door handles wiped' },
        { title: 'Light switches wiped' },
        { title: 'Top of door frames dusted' },
        { title: 'Floor swept/mopped/vacuumed' },
        { title: 'Wastebasket emptied' }
      ]
    },
    living: {
      items: [
        { title: 'Closets inside' },
        { title: 'Window sills dusted' },
        { title: 'Mirrors cleaned' },
        { title: 'Cobwebs removed' },
        { title: 'Door handles wiped' },
        { title: 'Light switches wiped' },
        { title: 'Top of door frames dusted' },
        { title: 'Banister wiped' },
        { title: 'Stairs swept/mopped/vacuumed' },
        { title: 'Floor swept/mopped/vacuumed' },
        { title: 'Wastebasket emptied' }
      ]
    }

  }

  extraServices: any = [
    { title: 'Garbage can inside/outside', price: '$20' },
    { title: 'Windows inside', price: '$30/5' },
    { title: 'Baseboards', price: '$30' },
    { title: 'Vacuum sofa', price: '$30' },
    { title: 'Laundry', price: '$30' },
    { title: 'Move in/out package', price: '$140' },
    { title: 'Organic cleaning', price: '$30' },
  ]

  freeExtraServices: any = [
    { title: 'Fridge inside/outside' },
    { title: 'Oven inside/outside' },
    { title: 'Cabinets inside/outside' },
    { title: 'Closets inside' },
    { title: 'Tile area scrubbed' },
    { title: 'Door handles wiped' },
    { title: 'Light switches wiped' },
    { title: 'Top of door frames dusted' },

  ]

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
