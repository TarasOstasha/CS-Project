import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-services',
  templateUrl: './faq-services.component.html',
  styleUrls: ['./faq-services.component.less']
})
export class FaqServicesComponent implements OnInit {
  faqAccordion = [
    { title: "1. Do cleaners bring their own supplies? ", paragraph: "We will be providing the basic cleaning supplies needed to clean your home. We ask that you provide a broom & dust pan, mop, toilet brush and vacuum if you have carpeted areas." },
    { title: "2. What if I want to use my own supplies?", paragraph: "You may provide your own cleaning supplies and equipment, if preferred." },
    { title: "3. What are the organic cleaners?", paragraph: "Products with friendly ingredients that preserve environmental quality for the human health. " },
    { title: "4. How many people will clean my home?", paragraph: "Generally, we send only one cleaner per home, but depending on the size and condition, we could send more cleaners if needed." },
    { title: "5. What are your hours of operation?", paragraph: "Depending on your location, the hours that we are available to clean changes. Usually, you will be able to schedule an appointment for cleaning any time between 7am and 10pm, 7 days a week. Our customer support line operates from 9am – 6pm, 7 days a week." }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
