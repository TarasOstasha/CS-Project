import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-billing',
  templateUrl: './faq-billing.component.html',
  styleUrls: ['./faq-billing.component.less']
})
export class FaqBillingComponent implements OnInit {
  
  constructor() { }

  faqAccordion = [
    { title: 'How do I change my credit card information?', paragraph: 'You can change your credit card information on your client dashboard.' },
    { title: 'Why do I see a $1 charge after I have made my payment?', paragraph: 'Not to worry! This is an authorization debit requested to your issuing bank to verify your credit card. It is only a temporary charge and will get refunded back to you within the next 7-10 business days.' },
    { title: 'What if I am overcharged?', paragraph: 'We always try to avoid these situations, but sometimes mistakes do happen! If you feel you have been overcharged, please let us know as soon as possible so we can issue a refund or provide you with credit for your next booking – whichever you prefer!' },
    { title: 'Can I pay by cash?', paragraph: 'Booking with us means there is a secure way a client can pay for cleaning on ONLY accept credit card payment. We accept all major credit cards and will charge your credit card that you have on file with us. We DO NOT accept cash nor check for payment. All payments are processed through Stripe a third party secure gateway – 256-bit SSL-encrypted, PCI-compliant system used and trusted by companies worldwide.' },
    { title: 'When does payment occur?', paragraph: 'Payment occurs on the morning of the clean and your credit card will be charged ONLY then.' },
    { title: 'How do I pay?', paragraph: 'Booking with us means there is a secure way our clients can pay for cleaning and we ONLY accept credit card payments and we accept all major credit cards and will charge your credit card on the morning of your clean. To make a booking this can only be made if you book through our system and confirm your booking. All payments are processed through Stripe – a secure, 256-bit SSL-encrypted, PCI-compliant system used and trusted by companies worldwide.' }
  ]

  ngOnInit(): void {
  }

}
