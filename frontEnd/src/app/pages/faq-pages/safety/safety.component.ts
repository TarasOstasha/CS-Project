import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.less']
})
export class SafetyComponent implements OnInit {
  faqAccordion = [
    { title: 'Can I trust You with my credit card transactions?', paragraph: `
      Yes! Your credit card information is not stored in our system – all payments are processed through Stripe, a secure, 256-bit SSL-encrypted, PCI-compliant system used and trusted by companies worldwide.
      Credit card payments are all processed the morning of each clean.
    ` },
    { title: 'Are Your Maids and Housekeepers professionals?', paragraph: `
      All Lazy Susans maids and cleaning professionals are reliable and very experienced in their field. 
      If you feel uncomfortable with the professional assigned to your booking, 
      please contact us and let us know about your concerns so we can find a solution for you as soon as possible. 
      We proudly service Manhattan and throughout NYC and Hudson County New Jersey!
    ` },
    { title: 'Are Your maids experienced in their field?', paragraph: `
      Yes! All of our housekeepers and maids have had previous experience in paid domestic cleaning. 
      Additionally, every professional must maintain a certain rating to remain on our Lazy Susans platform.
    ` },
    { title: 'Are your maids and housekeepers insured?', paragraph: ` 
      Yes! All of our Cleaning Service, Inc is fully insured and all of our home cleaning housekeepers are covered by public liability insurance. Our company proudly serves Manhattan, Queens, Brooklyn and Hudson County NJ
    ` },
    { title: 'Are Yours Housekeepers reference-checked?', paragraph: 'Yes! All our Maids and Housekeepers have been through a thorough reference checking process in order to come on board with us.' },
    { title: 'Can I get a refund if I’m unhappy with the clean?', paragraph: 'In the rare event that you are unsatisfied with your clean, we will offer you a re-clean at a time that suits you, free of charge.' },
    { title: 'How can I trust Your Maid to do a good job?', paragraph: `  
      We want all of our customers to have the best possible experience with Us. 
      To ensure this, all of our housekeepers and Maid professionals have gone through a strict recruitment process, 
      from an in-person interview to a trial clean with one of our 5-star cleaners. 
      Additionally, all of our professionals have paid cleaning experience in domestic home cleaning and have provided professional references.
    ` },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
