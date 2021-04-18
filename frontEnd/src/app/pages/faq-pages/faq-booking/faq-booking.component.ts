import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-booking',
  templateUrl: './faq-booking.component.html',
  styleUrls: ['./faq-booking.component.less']
})
export class FaqBookingComponent implements OnInit {

  faqAccordion = [
    { title: 'Can I make a booking for today?', paragraph: 'Yes of course, we accept day bookings. Please call to us or check online if we available today.' },
    { title: 'Can I request a specific cleaner?', paragraph: 'Of course, let us know please who you want to come to you for cleaning. And we will see when your particular cleaner is available.' },
    { title: 'Why can’t I book the date and time that I want?', paragraph: 'For this date and time there is no cleaner available, you will have to choose a different date and time.' },
    { title: 'How do I cancel a booking? ', paragraph: 'You can cancel your booking by calling us. Please note that if you cancel within 24 hrs a cancelation fee of $60 will be charged.  ' },
    { title: 'Can I change the day or time I booked?', paragraph: 'Yes, you can do this by contacting us. However, please notify us at least 24 hours in advance.' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
