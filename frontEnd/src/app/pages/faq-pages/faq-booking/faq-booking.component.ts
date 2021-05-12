import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-booking',
  templateUrl: './faq-booking.component.html',
  styleUrls: ['./faq-booking.component.less']
})
export class FaqBookingComponent implements OnInit {

  faqAccordion = [
    { title: "1. Can I make a booking for today?", paragraph: "Yes of course, we accept day bookings. Please call to us or check online if we available today." },
    { title: "2. Can I request a specific cleaner?", paragraph: "Of course, let us know please who you want to come to you for cleaning. And we will see when your particular cleaner is available." },
    { title: "3. Why can’t I book the date and time that I want?", paragraph: "For this date and time there is no cleaner available, you will have to choose a different date and time." },
    { title: "4. How do I cancel a booking? ", paragraph: " You can cancel your booking by calling us. Please note that if a cancellation to your schedule service is made less than 24 hours there is a $60 fee." }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
