import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  serviceCards = [
    { name: 'Deep Cleaning Service' },
    { name: ' Move in/ Move out Cleaning ' },
    { name: 'Home Cleaning Services NYC' },
    { name: 'Post Renovation Cleaning Service NYC' },
    { name: 'Post Construction Cleaning' },
    { name: 'Office Cleaning Services' }
  ];
  // navMenuBottom = [
  //   { nav: 'LOGO', cols: 3 },
  //   { nav: 'Telephone', cols: 1 },
  //   { nav: 'Facebook', cols: 1  },
  //   { nav: 'Instagram', cols: 1 },
  //   { nav: 'Home', cols: 1 },
  //   { nav: 'Services', cols: 1 },
  //   { nav: 'Pricing', cols: 1 },
  //   { nav: 'Contact Us', cols: 1 },
  //   { nav: 'FAQ', cols: 1 },
  //   { nav: 'Book Now', cols: 1 }
  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
