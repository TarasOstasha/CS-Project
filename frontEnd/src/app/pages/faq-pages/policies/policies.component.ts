import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.less']
})
export class PoliciesComponent implements OnInit {
  faqAccordion = [
    { title: "1. What is your cancellation or rescheduling policy?", paragraph: "If you need to cancel or reschedule, call to us in advance. There is a $60 fee if less then 24hrs are given." },
    { title: "2. Which payment forms Crystal System Cleaning accept?", paragraph: "Visa, Mastercard, Discover, American Express, Cash and Check." },
    { title: "3. Can I leave keys for convenient entry into my place?", paragraph: "Keys may be supplied to us for convenient entry. Please fill out a Key Release Form for this free service, along with two (2) sets of keys. We will send you a Key Release Form with Confirmation Letter on the email." },
    { title: "4. What can happen if I missed appointment for cleaning and didn't let them go in?", paragraph: "There will be a fee in the full service amount for any appointments missed due to inability to gain access to the home. " },
    {
      title: "5. What to do if the cleaner damaged the item in my house?", paragraph: `Any damages discovered should be reported to Crystal System Cleaning within 24 hours of the service date. 
      Crystal System Cleaning is not responsible for any damage to an item due to improper installation of that item, or improper instructions given to the cleaner.` }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
