import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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


// material
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ServicesComponent,
    MeveComponent,
    OfficeComponent,
    RegularComponent,
    DeepComponent,
    GreenComponent,
    ConstructionComponent,
    RenovationComponent,
    PricingComponent,
    ContactUsComponent,
    FaqComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
