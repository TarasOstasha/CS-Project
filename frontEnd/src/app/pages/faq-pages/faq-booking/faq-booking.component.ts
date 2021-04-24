import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-booking',
  templateUrl: './faq-booking.component.html',
  styleUrls: ['./faq-booking.component.less']
})
export class FaqBookingComponent implements OnInit {

  faqAccordion = [
    { title: "1. Can I Make A Booking For Today?", paragraph: "Yes Of Course, We Accept Day Bookings. Please Call To Us Or Check Online If We Available Today." },
    { title: "2. Can I Request A Specific Cleaner?", paragraph: "Of Course, Let Us Know Please Who You Want To Come To You For Cleaning. And We Will See When Your Particular Cleaner Is Available." },
    { title: "3. Why Can’t I Book The Date And Time That I Want?", paragraph: "For This Date And Time There Is No Cleaner Available, You Will Have To Choose A Different Date And Time." },
    { title: "4. How Do I Cancel A Booking? ", paragraph: " You Can Cancel Your Booking By Calling Us. Please Note That If A Cancellation To Your Schedule Service  Is Made Less Than 24 Hours There Is A $60 Fee." }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
