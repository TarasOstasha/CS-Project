import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.less']
})
export class PoliciesComponent implements OnInit {
  faqAccordion = [
    { title: 'What are your hours of operation?', paragraph: `
      Depending on your location, the hours that we are available to clean changes. In order to check, simply going to our booking process here, enter your address and proceed to the ‘Date and Time’ page. All of the available dates and times that we are available to clean your home will be shown there.
      Usually, you will be able to schedule a Lazy Susans clean to take place any time between 7am and 10pm, 7 days a week.
      Our customer support line operates from 9am – 6pm, Monday to Friday.
    ` },
    { title: 'How does your 100% satisfaction guarantee work?', paragraph: `
      In the rare event that you are not 100% satisfied with the job, please contact us so we can make it right for you. We will offer to send another Lazy Susans professional to ensure that you are satisfied with the standard of our service.
      Enquiries regarding the satisfaction guarantee must be made within 48 hours of completion of the booking.
    ` },
    { title: 'What is your cancellation or rescheduling policy?', paragraph: `
      You can cancel or reschedule your booking free of charge, provided you give at least 48 hours’ notice.
      However, if you do cancel or reschedule your booking within 24 hours of its starting time, you will incur an $80.00 fee. Rescheduling no fee within 48 hours but canceling  within 48 hours will result in $40.00. This is because our cleaners have already locked in that day and lose valuable working hours if you cancel with short notice.
    ` }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
