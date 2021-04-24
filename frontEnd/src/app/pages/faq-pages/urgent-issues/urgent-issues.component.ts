import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urgent-issues',
  templateUrl: './urgent-issues.component.html',
  styleUrls: ['./urgent-issues.component.less']
})
export class UrgentIssuesComponent implements OnInit {

  faqAccordion = [
    {
      title: "1. What should I do if something is damaged?",
      paragraph: `Any damages discovered should be reported to Crystal System Cleaning within 24 hours of the service date. Crystal System Cleaning is not responsible for any damage to an item due to improper installation of that item, or improper instructions given to the cleaner.`
    },
    { title: "2. What should I do if I need  extra time after cleaning done?", paragraph: "After cleaning done we will charge you $40/h." },
    { title: "3. What should I do If I don’t like cleaning service?", paragraph: "If you’re not 100% satisfied with our service, contact us and we assure you , we make things right in the less time possible." }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
