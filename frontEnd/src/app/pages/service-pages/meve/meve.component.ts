import { Component, OnInit } from '@angular/core';
declare var $: any;
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
    // { title: 'Garbage can inside/outside', price: '$20' },
    { title: 'Windows inside', price: '$60' },
    // { title: 'Baseboards', price: '$30' },
    { title: 'Vacuum sofa', price: '$50' },
    { title: 'Laundry', price: '$30' },
    // { title: 'Move in/out package', price: '$140' },
    // { title: 'Organic cleaning', price: '$30' },
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



  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      if (window.matchMedia("(max-width: 767px)").matches) { // method to scroll up on iPhone when opening a page
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300)
      }
    });
  }


  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }


}
