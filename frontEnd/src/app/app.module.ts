import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// pages, parts
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
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
<<<<<<< HEAD
import { MatSnackBarModule } from '@angular/material/snack-bar';
=======
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

>>>>>>> 57ff02ddc6233766615eac4bd419d767c53ea48b
import { MatExpansionModule } from '@angular/material/expansion';
import { StarRatingComponent } from './parts/star-rating/star-rating.component';


<<<<<<< HEAD


=======
>>>>>>> 57ff02ddc6233766615eac4bd419d767c53ea48b
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// other material modules
//import { MatCarouselModule } from '@ngmodule/material-carousel';


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
    BookingComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatRippleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
    //MatCarouselModule.forRoot(),
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
