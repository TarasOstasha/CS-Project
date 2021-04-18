import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.less']
})
export class PricingComponent implements OnInit {
  
  priceCard: any = {
      items: [
        { type: 'Studio', price: '90$', frequency1: 'Weekly', frequency2: 'Biweekly - $100', frequency3: 'Monthly - $110 ', frequency4: 'One time - $115', rec_time: 'Recommend time - 2.5h' },
        { type: '1 bedroom/1 bathroom', price: '110$', frequency1: 'Weekly', frequency2: 'Biweekly - 120$', frequency3: 'Monthly - 130$', frequency4: 'One time - 135$', rec_time: 'Recommend time - 3h' },
        { type: '1 bedroom/2 bathroom', price: '140$', frequency1: 'Weekly', frequency2: 'Biweekly - 150$', frequency3: 'Monthly - 160$', frequency4: 'One time - 165$',  rec_time: 'Recommend time - 4 h' },
        { type: '2 bedroom/1 bathroom', price: '130$', frequency1: 'Weekly', frequency2: 'Biweekly - 140$', frequency3: 'Monthly - 150$', frequency4: 'One time - 155$',  rec_time: 'Recommend time - 3.5h' },
        { type: '2 bedroom/2 bathroom', price: '160$', frequency1: 'Weekly', frequency2: 'Biweekly - 170$', frequency3: 'Monthly - 180$', frequency4: 'One time - 185$',  rec_time: 'Recommend time - 4.5h' },
        { type: '3 bedroom/1 bathroom', price: '150$', frequency1: 'Weekly', frequency2: 'Biweekly - 160$', frequency3: 'Monthly - 170$', frequency4: 'One time - 175$',  rec_time: 'Recommend time - 4h' },
        { type: '3 bedroom/2 bathroom', price: '180$', frequency1: 'Weekly', frequency2: 'Biweekly - 190$', frequency3: 'Monthly - 200$', frequency4: 'One time - 205$',  rec_time: 'Recommend time - 5h' },
        { type: 'Hourly rate', cleaners: '1 cleaner - 40$/h', cleaners2: '2 cleaners - 75$/h', recommended_time: '3 h minimum' },
        { type: 'Extra services', extraService1: 'Refrigerator  $30', extraService2: 'Oven  $30', extraService3: 'Inside cabinets  $30', extraService4: 'Inside windows  $30', extraService5: 'Vacuum the sofa  $30',  rec_time: 'Laundry wash/dry  $30' }
        // { type: 'Extra services', extraService1: ['Refrigerator ', '$30'], extraService2: { type: 'Oven ', price: '$30' }, extraService3: { type: 'Inside cabinets ', price: '$30' }, extraService4: { type: 'Inside windows', price: '$30' }, extraService5: { type: 'Vacuum the sofa', price: '$30' },  rec_time: { type: 'Laundry wash/dry', price: '$30' } }
      ]
  }

  public test = { type: 'Refrigerator ', price: '$30' }
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0); 
  }

}

// 
// -  
// - 
// -  
// -  
// - 
// - 