import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-billing',
  templateUrl: './faq-billing.component.html',
  styleUrls: ['./faq-billing.component.less']
})
export class FaqBillingComponent implements OnInit {

  constructor() { }

  faqAccordion = [
    { title: "1. When does payment occur? ", paragraph: "Payment occur on the cleaning day. We will charge payment from your card after the cleaning services will finish. " },
    { title: "2. What is cancellation fee? ", paragraph: "If a cancellation to your schedule service  is made less than 24 hours there is a $60 fee." },
    { title: "3. What if I am overcharged?", paragraph: "If you feel you have been overcharged, please let us know as soon as possible so we can issue a refund or provide you with credit for your next booking – whichever you prefer." },
    { title: "4.  Is tips included? ", paragraph: "Tips don’t include in the price. Tipping is not mandatory  in any way, but you have the option of doing so if you feel that you've received exceptional service." },
  ]

  ngOnInit(): void {
  }

}



