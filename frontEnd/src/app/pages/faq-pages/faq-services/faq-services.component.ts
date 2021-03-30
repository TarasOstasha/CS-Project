import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-services',
  templateUrl: './faq-services.component.html',
  styleUrls: ['./faq-services.component.less']
})
export class FaqServicesComponent implements OnInit {
  faqAccordion = [
    { title: 'How does the pricing work?', paragraph: `
      The pricing is based on the number of bedrooms and bathrooms selected (which includes common areas such as kitchen and living rooms). Once you select everything including any extras such as inside of oven, deep cleaning, inside of cabinets, wash and fold etc you will see a total cleaning duration will be calculated for total hours and a price including sales tax. If you are satisfied then proceed and book your clean. You will see a CONFIRMED pop up message, this is your confirmation.
      We also offer the ability to book a cleaner/s by the hour . This is what we call a Custom Cleaning option.
      If you’d like, we also do offer additional services that you can select during the checkout process – these additional services add one extra hour to your booking.
    ` },
    { title: 'How do I know which Lazy Susans professional will clean my house?', 
      paragraph:`
      All of our Lazy Susans professionals have been through our extensive recruitment process, which has allowed us to build a large network of friendly and experienced cleaners who have been selected for their cleaning quality, reliability and customer service.
      Based on your requested date and time, we work to match you with a Lazy Susans professional that is most suited to your job. Log in here to see who is assigned to your upcoming booking.
    ` },
    { title: 'Do you offer any additional services?', paragraph: 'We also offer the following additional services, which are available on request (these may add extra time to your booking)' },
    { title: 'Do cleaners bring their own supplies? What if I want to use my own supplies?', paragraph: 'All of our professionals are equipped with their own cleaning supplies and equipment, and you can opt to use them at your booking for a $5 fee. If you’d like, you can also provide your own supplies instead.' },
    { title: 'When can I expect my Lazy Susans professional to arrive?', paragraph: 'We recommend all of our professionals to arrive at least 10 minutes before the scheduled booking time to ensure that they will be ready to start right on time.' },
    { title: 'What’s included in the Lazy Susans standard home clean?', paragraph: 'When you book with us, we estimate and recommend the number of hours for your booking based on the size of your home. There is a minimum booking time of 2 hours, and we also suggest that you do book the recommended number of hours just so our Lazy Susans professional will be able to complete all of the tasks listed below. However, you do have the option of booking less than the recommended time – if so, please leave some notes after your booking has been confirmed so we can ensure that our professional gets all your priority areas cleaned!' },
    { title: 'Do you provide end-of-lease cleaning services?', paragraph: 'Of course, we generally charge this the same as our Deep Clean home cleaning service.' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
