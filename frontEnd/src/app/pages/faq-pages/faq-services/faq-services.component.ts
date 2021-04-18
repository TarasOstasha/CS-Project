import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-services',
  templateUrl: './faq-services.component.html',
  styleUrls: ['./faq-services.component.less']
})
export class FaqServicesComponent implements OnInit {
  faqAccordion = [
    { title: 'Do cleaners bring their own supplies? ', paragraph: `
      All of our professionals are equipped with their own cleaning supplies and equipment.  
    ` },
    { title: 'What if I want to use my own supplies?', 
      paragraph:`
      You may provide your own cleaning supplies and equipment, if preferred.
    ` },
    { title: 'What are the organic cleaners?', paragraph: `Products with friendly ingredients that preserve environmental quality for the human health.` },
    { title: 'How many people will clean my home? ', paragraph: `Generally, we send only one cleaner per home, but depending on the size and condition, we could send more cleaners if needed.` },
    { title: 'What are your hours of operation?', paragraph: `Depending on your location, the hours that we are available to clean changes. 
      Usually, you will be able to schedule an appointment for cleaning any time between 7am and 10pm, 7 days a week.
      Our customer support line operates from 9am – 6pm, Monday to Friday.` },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
