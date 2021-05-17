import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-green',
  templateUrl: './green.component.html',
  styleUrls: ['./green.component.less']
})
export class GreenComponent implements OnInit {
  servicesCheckbox: any = {
    bathroom: {
      items: [
        { title: 'Toilet cleaned, inside/outside' },
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
        { title: 'Beds made, linens changed ' },
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
    { title: 'Fridge inside/outside', price: '$30' },
    { title: 'Oven inside/outside', price: '$30' },
    { title: 'Cabinets inside/outside', price: '$30' },
    { title: 'Vacuum Sofa', price: '$50' },
    { title: 'Laundry', price: '$30' },
    // { title: 'Move in/out Package', price: '$140' },
    // { title: 'Organic Cleaning', price: '$30' },
    { title: 'Windows inside', price: '$60' },
    // { title: 'Baseboards', price: '$30' }
  ]




  constructor() { }

  ngOnInit(): void {
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
