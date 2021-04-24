import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.less']
})
export class SafetyComponent implements OnInit {
  faqAccordion = [
    { title: "1. Are you insured and bonded?", paragraph: "Yes, we are insured and bonded. We understand that it is a privilege to be in your home and we are always careful. In the unlikely event that an object is damaged, please notify us within 24 hours." },
    { title: "2. Do you guarantee your work?", paragraph: "Absolutely. We assigned an account manager to every client to make sure a proper follow-up of your case is made. Our personal are well-trained and experienced and have direct communication with you and the manager." },
    { title: "3. Can I get a refund if I’m unhappy with the services?", paragraph: "If you’re not 100% satisfied with our service, contact us and we assure you , we make things right in the less time possible." },
    { title: "4. Are Yours Housekeepers reference-checked?  ", paragraph: "Yes. All our cleaners have been through a thorough reference checking process in order to come on board with us." },
    { title: "5. In presence of my pet, how will my place be cleaned? ", paragraph: "We love pets. We know that pets are also part of the family. In fact, we use select products that are safe for pets to be around. Please make sure that your pets in a cage or in separate room from the cleaner. At your own risk, you can greet your pet with the cleaner. " }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
