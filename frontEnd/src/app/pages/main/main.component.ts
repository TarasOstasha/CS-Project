import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  serviceCards = [
    { name: 'Deep Cleaning Service', routerLink: ['/deep-cleaning']},
    { name: 'Meve Cleaning ', routerLink: ['/meve-cleaning'] },
    { name: 'Office Cleaning Services', routerLink: ['/office-cleaning'] },
    { name: 'Regular Cleaning Service', routerLink: ['/regular-cleaning'] },
    { name: 'Post Construction Cleaning', routerLink: ['/post-construction'] },
    { name: 'Post Cleaning Services', routerLink: ['/post-renovation'] }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
