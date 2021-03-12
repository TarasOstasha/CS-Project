import { NgModule } from '@angular/core';
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



const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'services', component: ServicesComponent, children: [
    { path: 'move-cleaning', component: MeveComponent }, 
    { path: 'office-cleaning', component: OfficeComponent }, 
    { path: 'regular-cleaning', component: RegularComponent },
    { path: 'deep-cleaning', component: DeepComponent },
    { path: 'green-cleaning', component: GreenComponent },
    { path: 'post-construction', component: ConstructionComponent },
    { path: 'post-renovation', component: RenovationComponent },
  ] },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'booking', component: BookingComponent },
  { path: '**', redirectTo: '/p404' } //should be last one
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
