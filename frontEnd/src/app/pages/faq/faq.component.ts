import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})
export class FaqComponent implements OnInit {
  faqObj = [
    { title: 'Billing & Payments', img: '../../../assets/images/faq/billing___.png', routerLink: ['/billing-faq'] },
    { title: 'Bookings', img: '../../../assets/images/faq/booking___.png', routerLink: ['/booking-faq'] },
    { title: 'Our Services', img: '../../../assets/images/faq/services___.png', routerLink: ['/services-faq'] },
    { title: 'Policies', img: '../../../assets/images/faq/policies__.png', routerLink: ['/policies-faq'] },
    { title: 'Trust & Safety', img: '../../../assets/images/faq/safety___.png', routerLink: ['/safety-faq'] },
    { title: 'Urgent Issues', img: '../../../assets/images/faq/issues___.png', routerLink: ['/urgent-issues-faq'] }
  ]


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
      console.log(params);
    });
 
    window.scrollTo(0, 0); 
  }

}
