import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component'
import { ServicesComponent } from './pages/services/services.component';
import { MeveComponent } from './pages/service-pages/meve/meve.component';
import { OfficeComponent } from './pages/service-pages/office/office.component';
import { RegularComponent } from './pages/service-pages/regular/regular.component';
import { DeepComponent } from './pages/service-pages/deep/deep.component';
import { GreenComponent } from './pages/service-pages/green/green.component';
import { ConstructionComponent } from './pages/service-pages/construction/construction.component';
import { RenovationComponent } from './pages/service-pages/renovation/renovation.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BookingComponent } from './pages/booking/booking.component';

import { FaqServicesComponent } from './pages/faq-pages/faq-services/faq-services.component';
import { PoliciesComponent } from './pages/faq-pages/policies/policies.component';
import { SafetyComponent } from './pages/faq-pages/safety/safety.component';
import { UrgentIssuesComponent } from './pages/faq-pages/urgent-issues/urgent-issues.component';
import { FaqBookingComponent } from './pages/faq-pages/faq-booking/faq-booking.component';
import { FaqBillingComponent } from './pages/faq-pages/faq-billing/faq-billing.component';
import { AuthComponent } from './parts/auth/auth.component';



const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  //{ path: 'main', loadChildren: () => import('./pages/main/main.modules').then(m => m.MainModule) },

  // { path: 'services', component: ServicesComponent, children: [
  //   { path: 'move-cleaning', component: MeveComponent }, 
  //   { path: 'office-cleaning', component: OfficeComponent }, 
  //   { path: 'regular-cleaning', component: RegularComponent },
  //   { path: 'deep-cleaning', component: DeepComponent },
  //   { path: 'green-cleaning', component: GreenComponent },
  //   { path: 'post-construction', component: ConstructionComponent },
  //   { path: 'post-renovation', component: RenovationComponent },
  // ] },
  { path: 'services', component: ServicesComponent },
  { path: 'services/move-cleaning', component: MeveComponent },
  { path: 'services/office-cleaning', component: OfficeComponent },
  { path: 'services/regular-cleaning', component: RegularComponent },
  { path: 'services/deep-cleaning', component: DeepComponent },
  { path: 'services/green-cleaning', component: GreenComponent },
  { path: 'services/post-construction', component: ConstructionComponent },
  { path: 'services/post-renovation', component: RenovationComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'faq/billing-faq', component: FaqBillingComponent },
  { path: 'faq/booking-faq', component: FaqBookingComponent },
  { path: 'faq/services-faq', component: FaqServicesComponent },
  { path: 'faq/policies-faq', component: PoliciesComponent },
  { path: 'faq/safety-faq', component: SafetyComponent },
  { path: 'faq/urgent-issues-faq', component: UrgentIssuesComponent },
  // { path: 'faq', component: FaqComponent, children: [
  //   { path: 'billing-faq', component: FaqBillingComponent },
  //   { path: 'booking-faq', component: FaqBookingComponent },
  //   { path: 'services-faq', component: FaqServicesComponent },
  //   { path: 'policies-faq', component: PoliciesComponent },
  //   { path: 'safety-faq', component: SafetyComponent },
  //   { path: 'urgent-issues-faq', component: UrgentIssuesComponent },
  // ] },
  { path: 'booking', component: BookingComponent },
  { path: 'admin', component: AuthComponent },
  { path: '**', redirectTo: '/p404' } //should be last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
