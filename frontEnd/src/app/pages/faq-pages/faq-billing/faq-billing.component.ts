import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-billing',
  templateUrl: './faq-billing.component.html',
  styleUrls: ['./faq-billing.component.less']
})
export class FaqBillingComponent implements OnInit {
  
  constructor() { }

  faqAccordion = [
    { title: 'When does payment occur? ', paragraph: 'Payment occur on the cleaning day. We will change payment from your card after the cleaning services will finish. ' },
    { title: 'Which do forms of payment Crystal System Cleaning accept? ', paragraph: 'Visa, Mastercard, Discover, American Express, Cash and Check.' },
    { title: 'What is cancellation fee?', paragraph: 'If a cancellation to your schedule service  is made less than 24 hours there is a $59.95 fee.' },
    { title: 'What if I am overcharged?', paragraph: 'If you feel you have been overcharged, please let us know as soon as possible so we can issue a refund or provide you with credit for your next booking – whichever you prefer. ' },
    { title: ' Is tips included?', paragraph: `Tips don’t include in the price. Tipping is not mandatory  in any way, but you have the option of doing so if you feel that you've received exceptional service.` },
  ]

  ngOnInit(): void {
  }

}



