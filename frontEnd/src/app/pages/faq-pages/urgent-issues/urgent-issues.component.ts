import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urgent-issues',
  templateUrl: './urgent-issues.component.html',
  styleUrls: ['./urgent-issues.component.less']
})
export class UrgentIssuesComponent implements OnInit {

  faqAccordion = [
    { title: 'What should I do if something is damaged?', paragraph: `
      Reliability and cleaning quality are top priorities when we recruit our professionals. 
      This is to ensure that your cleaning experience goes smoothly without a hiccup. 
      However, in the rare event that something goes wrong and you’d like to file a damage claim, please contact us and we’ll assist you in resolving the issue immediately.
    ` },
    { title: 'What should I do if something is missing?', paragraph: `
      Reliability is a top priority when we recruit our Lazy Susans professionals. This is to ensure that your cleaning experience goes smoothly without a hiccup. 
      However, in the rare event that something goes wrong and you’d like to file a damage claim, please contact us and we’ll assist you in resolving the issue immediately.
    ` },
    { title: 'How do I file a claim or complaint?', paragraph: `
      Reliability is a top priority when we recruit our Lazy Susans professionals. This is to ensure that your cleaning experience goes smoothly without a hiccup. However, in the rare event that something goes wrong and you’d like to file a damage claim, please contact us and we’ll assist you in resolving the issue immediately.
    ` },
    { title: `
      What should I do if my Lazy Susans cleaning professional needs more time than I booked to complete the job?
    `, paragraph: `
      We try our best to estimate the number of hours that your job requires. However, as you know, every home and every job is different, so your cleaner may need more time than you originally booked for. If this happens and you are happy with the cleaner spending more time at your home, please contact us to update the booking and we’ll let you know what the additional cost is.
    ` },
    { title: 'What should I do if my professional doesn’t show up?', paragraph: ` 
      Punctuality and reliability are two of our top priorities when we recruit our professionals. 
      In the rare event that your cleaner doesn’t show up, please contact us via phone and we’ll help to resolve your issue immediately.
    ` },
    { title: 'What should I do if my Maid is late?', paragraph: ` 
      Punctuality and reliability are two of our top priorities when we recruit our professionals. 
      In the rare event that your cleaner doesn’t show up, please contact us via phone and we’ll help to resolve your issue immediately.
    ` },
    { title: 'How can I contact Your Cleaning Service?', paragraph: `
      Lazy Susans services Houses, Apartments and Condos in Manhattan, Brooklyn and throughout New York City. We are here for Whatever you need!  Contact us!.
    ` }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
