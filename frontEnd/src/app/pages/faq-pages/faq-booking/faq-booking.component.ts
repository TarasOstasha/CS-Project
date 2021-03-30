import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-booking',
  templateUrl: './faq-booking.component.html',
  styleUrls: ['./faq-booking.component.less']
})
export class FaqBookingComponent implements OnInit {

  faqAccordion = [
    { title: 'How do I book a regular cleaning service?', paragraph: 'You can choose to book a regular clean in our checkout process – your booking can be weekly, fortnightly or monthly and attract discounts. We also do one-off bookings.' },
    { title: 'Can I make special requests or add instructions to my booking?', paragraph: 'Of course you can! Leave any additional instructions or special requests in the additional notes section at the end of the checkout process. You can also edit these notes at any time via your client dashboard. Please note that not all requests can be fulfilled.' },
    { title: 'What happens after I make a booking?', paragraph: 'Relax! It’ll only be a matter of time before your home becomes sparking clean! Immediately after you make your booking, you will receive a confirmation email and soon enough, you’ll have one of our Lazy Susans professionals cleaning your home in no time!' },
    { title: 'How do I cancel my regularly scheduled bookings?', paragraph: 'If you don’t need your home cleaned for a particular week, you can skip it by logging into your dashboard and then cancel the booking. To completely cancel all future bookings, please contact us. Please note that you must cancel at least 24 hours prior to the start time of your booking, or a $80 cancellation fee will be incurred.' },
    { title: 'Can I change the number of hours I booked?', paragraph: 'Yes! You can do this by contacting us. However, please notify us at least 24 hours in advance. Please note that this cannot be guaranteed, as it will depend on the cleaner’s availabilities.' },
    { title: 'Do I have to be home for my booking? How do I let the cleaner in if I am not home?', paragraph: 'If you cannot be home for your booking, that’s perfectly fine. You can leave your key with reception or the name of your cleaner – whatever suits you! Once you’ve made up your mind, you can leave instructions for the cleaner in the additional notes section of the checkout process. If anything changes, you can edit your instructions via your client dashboard. Please note that if you leave your keys with the cleaner, Lazy Susans will not be responsible for any issues' },
    { title: 'How do I leave feedback?', paragraph: 'After your clean has been completed, you will be able to leave a rating and some feedback for your cleaner as soon as you log into your dashboard. We would really appreciate it if you could take out 5 seconds to provide some feedback – it goes directly into improving our services for you!' },
    { title: 'Why can’t I book the date and time that I want?', paragraph: 'We try our very best to find a cleaner for your preferred date and time. However, if you book on short notice, we may not be able to find you a Lazy Susans cleaning professional for your requested date and time. If this is the case and there is no cleaner available, you will have to choose a different date and time.' },
    { title: 'How do I edit a booking?', paragraph: 'You can edit your booking through your client dashboard. Please note that you must edit your booking at least 24 hours prior to the start time of your booking, or a $40 penalty fee will be incurred.' },
    { title: 'How do I reschedule a booking?', paragraph: 'If you need to re-schedule your booking, please feel free to send us an email at example.com or call us on 111 111 1111.' },
    { title: 'How do I cancel a booking?', paragraph: 'You can cancel your booking by calling us. Please note that if you cancel within 48 hrs a cancelation fee of $40 will be incurred and within 24 hours $80.00 will be charged. As you can appreciate the cleaners are booked for your cleans and lose work due to last minute cancelations.' },
    { title: 'Can I request a specific cleaner?', paragraph: 'Please note that if you request a specific cleaner, the availabilities for your next clean may not be as broad because it is restricted to when your particular cleaner is available.' },
    { title: 'Can I make a booking for today?', paragraph: 'Yes of course, we accept same day bookings. The booking system will give Lazy Susans a 3 hour window for same day bookings ie: If you are in the booking system say at 10 am then the next availability will show 1.00pm. Please call Michael the owner on 111 111 1111 and he can override this and move time forward but van only be done one the booking is created and confirmed.' },
    { title: 'How many hours should I book?', paragraph: 'Our system calculates a recommended number of hours to book for based on the number of bedrooms and bathrooms that you have, as well as any additional services that you’d like to select. However, you do always have the option to increase or decrease the number of hours that you’d like to book for, depending on what you think is appropriate. Please note that if you do book less hours than recommended, we suggest that you list the parts of your home that you want to be focused on as we may not be able to do a complete and thorough job of your entire home.' },
    { title: 'How do I make a booking?', paragraph: 'Making a booking with us is easy! Our online booking system makes everything much more simple and convenient for you! Simply enter details of your home and we will do the rest.' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
