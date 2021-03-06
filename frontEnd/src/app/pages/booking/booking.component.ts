import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { FormService } from '../../services/form.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';


const log = console.log;
declare var window: any;
declare var stripe: any;
declare var elements: any;
declare var jQuery: any;
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class BookingComponent implements OnInit, OnChanges {


  @ViewChild('stepperDOM') stepperDOM!: MatStepper;

  // ----------------------------------------------------------------------------------------------------------------- OPTIONS BEGIN
  tax: number = 8.875; //%
  standard: number = 70; //;
  // ----------------------------------------------------------------------------------------------------------------- OPTIONS END

  form!: FormGroup;
  form_1_1!: FormGroup;
  form_1_2!: FormGroup;
  form_1_3!: FormGroup;
  form_1_4!: FormGroup;
  stripePaymentForm!: FormGroup;
  creditCardCheck!: FormGroup;

  isEditable = false;
  // checkedGroup: string = 'residential';
  validationFlag: boolean = false;
  cardChecker: boolean = false;

  createItems(amount: number) {
    const arr = Array.from({ length: amount }, (v, k) => k + 1);
    return arr.map((el) => ({ title: el.toString() }))
  }
  createBedrooms() {
    const arr: any = this.createItems(10); // -> from 1 to 20: [{ title: '1' }, { title: n }]
    arr.unshift({ title: '0 - Studio' });
    return arr
  }
  create_sq_ft() {
    const arr = Array.from({ length: 20 }, (v, k) => k);
    const items: any = arr.map((el) => ({
      value: (el + 1).toString(),
      title: ((el + 1) * 500).toString() + ' - ' + ((el + 2) * 500)
    }));
    log(items);
    items.shift();
    items.shift();
    items.unshift({ value: '2', title: '1200 - 1500' });
    items.unshift({ value: '1', title: '1000 - 1200' });
    items.unshift({ value: '0', title: 'Under 1000' });
    return items
  }

  stepper: any = {
    // step - 1
    checkedGroup: 'residential',
    property_type: {
      items: [
        { title: 'Apartment' },
        { title: 'House' },
        { title: 'AirBNB' },
      ]
    },
    cleaning_type: {
      items: [
        { title: 'Regular cleaning' },
        { title: 'Deep cleaning' },
        { title: 'Organic cleaning' },
        { title: 'Move cleaning' },
        { title: 'Post construction cleaning' },
        { title: 'Post renovation cleaning' },
      ]
    },
    frequency: {
      items: [
        { title: 'Weekly', color: '#1976d2', value: 'weekly' }, // MATERIAL COLORS: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=1976D2
        { title: 'Biweekly', color: '#1976d2', value: 'biweekly' },
        { title: 'Monthly', color: '#1976d2', value: 'monthly' },
        { title: 'One Time', color: '#1976d2', value: 'oneTime' },
      ]
    },
    sq_ft: {
      items: this.create_sq_ft(),
      priceBegin: 20,
      price: 30
      // items: [
      // { title: 'Under 1000' },
      // { title: '1000 - 1200' },
      // { title: '1200 - 1500' },
      // { title: '1500 - 2000' },
      // { title: '2000 - 2500' },
      // { title: '2500 - 3000' },
      // { title: '3000 - 3500' },
      // ]
    },
    zip_code: '',
    email: '',
    bedrooms: {
      items: this.createBedrooms(),
      price: 20
    },
    date: '',
    bathrooms: {
      items: this.createItems(10), // -> from 1 to 20: [{ title: '1' }, { title: n }]
      price: 30
    },
    select_times: {
      items: [
        { title: 'Morning' },
        { title: 'Afternoon' },
        { title: 'Anytime' },
      ]
    },
    phone: '',
    // step - 2
    extras: {
      items: [
        // { value: 'same_day', color: '#eaf3fb', text: 'Same Day Service' },
        // { value: 'disinfection', color: '#eaf3fb', text: 'UV Disinfection', recommended: true },
        // { value: 'cleaning', color: '#eaf3fb', text: 'Deep Cleaning' },
        // { value: 'move', color: '#eaf3fb', text: 'Move In/Out Cleaning' },
        // { value: 'wash', color: '#eaf3fb', text: 'Hand Wash Dishes' },
        // { value: 'board', color: '#eaf3fb', text: 'Baseboards' },
        { value: 'fridge', color: '#eaf3fb', text: 'Inside the Fridge', amount: 1, price: 30, mode: 'piece' },
        { value: 'oven', color: '#eaf3fb', text: 'Inside the Oven', amount: 1, price: 30, mode: 'piece' },
        { value: 'cabinet', color: '#dfe9f3', text: 'Inside the Cabinets', amount: 1, price: 30, mode: 'ranges' },
        { value: 'washer', color: '#dfe9f3', text: 'Load(s) of Laundry', amount: 1, price: 30, mode: 'piece' },
        { value: 'window', color: '#dfe9f3', text: 'Windows', amount: 1, price: 60, mode: 'ranges-5' },
        { value: 'vacuum_sofa', color: '#dfe9f3', text: 'Vacuum the Sofa', amount: 1, price: 50, mode: 'piece' },
        // { value: 'wall', color: '#dfe9f3', text: 'Interior Walls' },
        // { value: 'pet', color: '#dfe9f3', text: 'Pet Hair Clean-up' },
        // { value: 'oven', color: '#dfe9f3', text: 'Hour(s) of Organizing' },
        // { value: 'oven', color: '#dfe9f3', text: 'Laundry wash & dry' },
        // { value: 'washer', color: '#dfe9f3', text: 'Inside oven' },
        // { value: 'refrigerator', color: '#dfe9f3', text: 'Refrigerator' },
      ]
    },
    // step - 3
    first_name: '',
    last_name: '',
    city: '',
    doorAccess: {
      items: [
        { title: 'Client will let us in' },
        { title: 'Doorman' },
        { title: 'Secure Keys holding' },
        { title: 'Other' },
      ]
    },
    selectTime: {
      items: [
        { title: 'Morning' },
        { title: '...' },
      ]
    },
    address: '',
    state: {
      items: [
        { title: 'NY' },
        { title: 'NJ' },
      ]
    },
    specialInstructions: '',
    aptSuite: '',
    howDidYouHear: '',
    // step - 4
    payBy: {
      items: [
        { title: 'Pay by check' },
        { title: 'Pay by cash' },
        { title: 'Pay by card' },
      ]
    }
  };

  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _form: FormService,
    private _api: ApiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  /* 
    ngOnInit() is called after ngOnChanges(). 
    ngOnChanges() is called every time inputs are updated by change detection.
    ngAfterViewInit() is called after the view is initially rendered. This is why @ViewChild() depends on it. You can't access view members before they are rendered.
    ngOnInit() is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.
    ngAfterViewInit() is called after a component's view, and its children's views, are created. Its a lifecycle hook that is called after a component's view has been fully initialized.
  */

  ngOnChanges() {
    log('ngOnChanges');

  }

  ngOnInit() {
    log('ngOnInit');
    $(document).ready(function () {
      if (window.matchMedia("(max-width: 767px)").matches) { // method to scroll up on iPhone when opening a page
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300)
      }
    });
    // this.cdr.detectChanges();

    // Mobile Layout (DOM manipulation)
    // setInterval(_ => {
    //   log('.');
    //   let target1 = jQuery("#doorAccess");
    //   let target2 = jQuery("#specialInstructions");
    //   //
    //   if (jQuery(document).width() <= 736) {
    //     // target1.css('padding: 0');
    //     if (target1.parent('#parent1').length) log('The element 1 has already been moved!');
    //     else target1.detach().appendTo('#parent1');
    //     //
    //     if (target2.parent('#parent2').length) log('The element 2 has already been moved!');
    //     else target2.detach().appendTo('#parent2');
    //   };
    // }, 500);

    // creditCard
    this.creditCardCheck = this._formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]],
      expiry: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      name: ['', Validators.required]
    });



    this.form_1_1 = this._formBuilder.group({
      checkedGroup: ['residential'],
      //
      cleaning_type: ['', Validators.required],
      property_type: ['', Validators.required],
      frequency: ['', Validators.required,],
      //
      sq_ft: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      email: ['', Validators.required],
      //
      bedrooms: ['', Validators.required],
      date: ['', Validators.required],
      phone: ['', Validators.required],
      //
      bathrooms: ['', Validators.required],
      select_times: ['', Validators.required],
    });

    this.form_1_2 = this._formBuilder.group({
      frequency: ['', Validators.required,],
      // extras_same_day: [''],
      // extras_disinfection: [''],
      // extras_cleaning: [''],
      // extras_move: [''],
      extras_fridge: [''],
      extras_oven: [''],
      extras_cabinet: [''],
      extras_washer: [''],
      extras_window: [''],
      extras_vacuum_sofa: [''],
      // extras_wash: [''],
      // extras_board: [''],
      // extras_refrigerator: [''],
      // extras_wall: [''],
      // extras_pet: [''],
    });

    this.form_1_3 = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      city: [''],
      doorAccess: ['', Validators.required],
      selectTime: [''],
      address: ['', Validators.required],
      state: [''],
      specialInstructions: [''],
      aptSuite: [''],
      howDidYouHear: [''],
      //
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
    });

    this.form_1_4 = this._formBuilder.group({
      terms: [''],
    });

    this.stripePaymentForm = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      payBy: [''],
    });

    // move to appropriate tab menu (residential, office, commercial) when press from main page
    this._activatedRoute.queryParams.subscribe(params => {
      this.form_1_1.value.checkedGroup = params.type;
      this.checkFormGroup(this.form_1_1.value.checkedGroup);
    });

    log('Can I GET FORM DATA& : ', this._form.formData);
    // set values from service
    const keys = Object.keys(this._form.formData);
    keys.forEach((key: any) => {
      log('key - ', key);
      const serviceValue = this._form.formData[key];
      if (key == 'approx_SF') { // crutch
        // find value by title
        const o = this.stepper.sq_ft.items.filter(item => item.title == serviceValue)[0];
        if (o) this.form_1_1.controls.sq_ft.setValue(o.value);
      } else if (this.form_1_1.controls[key]) {
        // log('key ---- ', key, serviceValue);
        this.form_1_1.controls[key].setValue(serviceValue);
      };
    });
  }

  stripePayment() {
    log('The stripePayment()');
    this.paymentTransaction();
    const checkPaymentWindow = setInterval(() => {
      const paymentWindow = document.querySelector('.ElementsModal--modal');
      if (paymentWindow) {
        window.elementsModal.toggleElementsModalVisibility();
        clearInterval(checkPaymentWindow);
      }
    }, 100);
  }

  placeOrder() {
    log('payBy: ', this.payBy);
    console.log(this.calculatePipe.total, this.form_1_1.value.checkedGroup, this.form_1_1.value.cleaning_type, this.form_1_1.value.email, this.form_1_3.value.first_name)
    if (this.payBy == 'Pay by card') {
      this.stripePayment();
    }
    else if (this.validationFlag && (this.payBy == 'Pay by cash' || this.payBy == 'Pay by check')) {
      this.getDate(); // write all information in calendar
      this.collectData(); // write user data in admin panel table
      this.sendBookingEmail(); // send email
      this.openSnackBar('You Have Booked an Appointment. Please Check Your Email', 'Thank you!');
      setTimeout(() => {
        this._router.navigate(['main']);
      }, 8000)
    } else {
      swal.fire({
        title: "Error",
        text: "Please Fill Out Credit Card Info",
        icon: "error",
        type: 'warning'
      });
      return
    }


  }

  // popup menu after submitted booking
  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top',
      panelClass: 'notif-success'
    });
  }
  // popup menu after submitted booking if err
  openSnackBarError(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }
  paymentTransaction() {
    try {
      window.elementsModal.create({
        type: 'stripe',
        totalPrice: this.calculatePipe.total, //100,
        // the modal demo will handle non-zero currencies automatically
        // items sent into the server can calculate their amounts and send back to the client
        //items: [{ sku: "sku_1234", quantity: 1 }],
        // Supported currencies here https://stripe.com/docs/currencies#presentment-currencies
        currency: "USD",
        businessName: this.form_1_1.value.checkedGroup, //'test',
        productName: this.form_1_1.value.cleaning_type, //'test1',
        customerEmail: this.form_1_1.value.email, //'test@gmail.com',
        customerName: this.form_1_3.value.first_name //'Jack',
      });
      //this.getDate(); // write all information in calendar
      //this.collectData(); // write user data in admin panel table
    } catch (error) {
      console.log(error)
    }

  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
    log('ngAfterViewInit');
    // this.stepperDOM.selectedIndex = 3;
    this.cdr.detectChanges();
    // make calendar appointment and save user data to admin panel after approved payment card

  }

  get calculatePipe() {

    let subtotal: number = 0;
    // standard
    subtotal += this.standard;
    // log('standard: ', subtotal);

    const isOneTime = (this.cleaning_type == 'Move cleaning') || (this.cleaning_type == 'Post construction cleaning') || (this.cleaning_type == 'Post renovation cleaning') // "one time" mode

    // type
    if (this.cleaning_type == 'Deep cleaning') subtotal += 40;
    if (this.cleaning_type == 'Organic cleaning') subtotal += 10;
    if (this.cleaning_type == 'Move cleaning') subtotal += 40;
    if (this.cleaning_type == 'Post construction cleaning') subtotal += 40;
    if (this.cleaning_type == 'Post renovation cleaning') subtotal += 40;
    // log('type: ', subtotal);

    // bed bath
    const bedBath = this.bedrooms * this.stepper.bedrooms.price + this.bathrooms * this.stepper.bathrooms.price;
    subtotal += bedBath; //this.bedrooms + this.bathrooms;
    // log('bed n bath: ', subtotal);

    // sq.ft
    if (this.sq_ft > 0 && this.sq_ft < 3) {
      subtotal += this.sq_ft * this.stepper.sq_ft.priceBegin;
      // log('ko: ', this.sq_ft * this.stepper.sq_ft.priceBegin);
    } else if (this.sq_ft > 2) {
      subtotal += this.sq_ft * this.stepper.sq_ft.price - 20;
      // log('ko: ', this.sq_ft * this.stepper.sq_ft.price - 20);
    };

    // log('sq.ft: ', subtotal);

    const weekly = subtotal - 10;
    const biweekly = subtotal;
    const monthly = subtotal + 10;
    const oneTime = subtotal + 15;

    // frequency
    if (!isOneTime) {
      if (this.frequency == 'Weekly') subtotal -= 10;
      if (this.frequency == 'Biweekly') subtotal += 0;
      if (this.frequency == 'Monthly') subtotal += 10;
      if (this.frequency == 'One Time') subtotal += 15;
      // log('freqency: ', subtotal);
    } else if (isOneTime) {
      subtotal += 0;
    };

    // log('>>>>>>>>>>>>>>>>>>', this.sq_ft, this.sq_ft * this.stepper.sq_ft.price );
    // if (this.sq_ft == '1000 - 1200') subtotal += 20;
    // if (this.sq_ft == '1200 - 1500') subtotal += 20;
    // if (this.sq_ft == '1500 - 2000') subtotal += 30;
    // if (this.sq_ft == '2000 - 2500') subtotal += 30;
    // if (this.sq_ft == '2500 - 3000') subtotal += 30;
    // if (this.sq_ft == '3000 - 3500') subtotal += 30;
    //extras
    if (this.extras_fridge && !isOneTime) subtotal += this.getExtrasTotalByKey('fridge');
    if (this.extras_oven && !isOneTime) subtotal += this.getExtrasTotalByKey('oven');
    if (this.extras_cabinet && !isOneTime) subtotal += this.getExtrasTotalByKey('cabinet');
    if (this.extras_washer && !isOneTime) subtotal += this.getExtrasTotalByKey('washer');
    if (this.extras_window) subtotal += this.getExtrasTotalByKey('window');
    if (this.extras_vacuum_sofa) subtotal += this.getExtrasTotalByKey('vacuum_sofa');
    // log('extras: ', subtotal);

    // tax
    const tax = this.percentage(this.tax, subtotal);
    // log('tax: ', subtotal);

    // total
    const total = subtotal + tax;
    // log('total: ', subtotal);

    // recommend time for cleaning
    const recommendTime = Math.round(subtotal / 40);
    //console.log(recommendTime)

    // make calendar appointment and save user data to admin panel after approved payment card
    window.bookingDate = {
      // date: this.form_1_1.value.date,
      // period: this.form_1_1.value.select_times,
      // cleaning_type: this.form_1_1.value.cleaning_type,
      // frequency: this.form_1_1.value.frequency,
      // sq_ft: this.form_1_1.value.sq_ft,
      // bedrooms: this.form_1_1.value.bedrooms,
      // bathrooms: this.form_1_1.value.bathrooms,
      // phone: this.form_1_1.value.phone,
      // first_name: this.form_1_3.value.first_name,
      // last_name: this.form_1_3.value.last_name,
      // city: this.form_1_3.value.city,
      // address: this.form_1_3.value.address,
      // state: this.form_1_3.value.state,
      // zip_code: this.form_1_1.value.zip_code,
      date: this.form_1_1.value.date, // date
      period: this.form_1_1.value.select_times, // day time
      cleaning_type: this.form_1_1.value.cleaning_type, // cleaning type
      property_type: this.form_1_1.value.property_type, // property type
      frequency: this.form_1_1.value.frequency, // frequency
      sq_ft: this.form_1_1.value.sq_ft, // sq.ft
      bedrooms: this.form_1_1.value.bedrooms, // bedrooms
      bathrooms: this.form_1_1.value.bathrooms, // bathrooms
      phone: this.form_1_1.value.phone,
      first_name: this.form_1_3.value.first_name, // first name
      last_name: this.form_1_3.value.last_name, // last name
      city: this.form_1_3.value.city, // city
      address: this.form_1_3.value.address, // address
      suite: this.form_1_3.value.aptSuite, // house number
      state: this.form_1_3.value.state, // state
      zip_code: this.form_1_1.value.zip_code, // zip code
      price: { total: total }, // price
      email: this.form_1_1.value.email, // email
      extras: { // extras
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      doorAccess: this.form_1_3.value.doorAccess, // door access info*
      specialInstructions: this.form_1_3.value.specialInstructions, // special instructions
      howDidYouHear: this.form_1_3.value.howDidYouHear,  // how did you hear about us
      payBy: this.stripePaymentForm.value.payBy // paying method
    }
    //console.log(window.bookingDate)
    let name = this.form_1_3.value.first_name.toLowerCase();
    window.collectedData = {
      // name: this.form_1_3.value.first_name,
      // last_name: this.form_1_3.value.last_name,
      // address: this.form_1_3.value.address,
      // city: this.form_1_3.value.city,
      // state: this.form_1_3.value.state,
      // zip_code: this.form_1_3.value.state,
      // phone: this.form_1_1.value.phone,
      // email: this.form_1_1.value.email
      name: name,
      last_name: this.form_1_3.value.last_name,
      address: this.form_1_3.value.address,
      city: this.form_1_3.value.city,
      state: this.form_1_3.value.state,
      zip_code: this.form_1_3.value.zip_code,
      phone: this.form_1_1.value.phone,
      email: this.form_1_1.value.email,
      //date: this.form_1_1.value.date, // date
      period: this.form_1_1.value.select_times, // day time
      cleaning_type: this.form_1_1.value.cleaning_type, // cleaning type
      property_type: this.form_1_1.value.property_type, // property type
      frequency: this.form_1_1.value.frequency, // frequency
      sq_ft: this.form_1_1.value.sq_ft, // sq.ft
      bedrooms: this.form_1_1.value.bedrooms, // bedrooms
      bathrooms: this.form_1_1.value.bathrooms, // bathrooms
      //first_name: this.form_1_3.value.first_name, // first name
      suite: this.form_1_3.value.aptSuite, // house number
      price: { total: total }, // price
      extras: { // extras
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      doorAccess: this.form_1_3.value.doorAccess, // door access info*
      specialInstructions: this.form_1_3.value.specialInstructions, // special instructions
      howDidYouHear: this.form_1_3.value.howDidYouHear,  // how did you hear about us
      payBy: this.stripePaymentForm.value.payBy // paying method
    }
    let parseDate = this.form_1_1.value.date.toString().substring(0, 9);
    window.emailDataStripePayment = {
      // company_name: this.form_1_3.value.last_name,
      // name: this.form_1_3.value.first_name,
      // phone: this.form_1_1.value.phone,
      // email: this.form_1_1.value.email,
      // frequency: this.form_1_1.value.frequency,
      // sq_ft: this.form_1_1.value.sq_ft,
      // time: parseDate, //this.form_1_1.value.date, // need to parse date
      // period: this.form_1_1.value.select_times,
      // address: this.form_1_3.value.address,
      // zip_code: this.form_1_1.value.zip_code
      company_name: this.form_1_3.value.last_name,
      name: this.form_1_3.value.first_name,
      phone: this.form_1_1.value.phone,
      email: this.form_1_1.value.email,
      frequency: this.form_1_1.value.frequency,
      sq_ft: this.form_1_1.value.sq_ft,
      time: parseDate,
      period: this.form_1_1.value.select_times,
      address: this.form_1_3.value.address,
      zip_code: this.form_1_1.value.zip_code,
      cleaning_type: this.form_1_1.value.cleaning_type,
      property_type: this.form_1_1.value.property_type,
      bedrooms: this.form_1_1.value.bedrooms,
      extras: {
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      price: { total: total }
    }
    return {
      bedBath,
      weekly,
      biweekly,
      monthly,
      oneTime,
      subtotal,
      tax,
      total,
      recommendTime
    }
  }

  percentage(percent: number, total: number) {
    return +((total / 100) * percent).toFixed(2)
  }

  goBack(stepperDOM: MatStepper) {
    stepperDOM.previous();
  }

  // goForward(stepperDOM: MatStepper) {
  //   stepperDOM.next();
  // }

  // next1(stepperDOM: MatStepper) {
  //   if (this.form.status == "VALID") stepperDOM.next()
  //   else log('Must fill!');
  // }

  fill_1(stepperDOM: MatStepper) {
    // log(stepperDOM);
    // log(this.form);
    // log(this.form.value);
    // this.form.value.checkedGroup

    // Step 1
    const example = {
      cleaning_type: 'Regular cleaning',
      property_type: 'House',
      frequency: 'Biweekly',
      //
      sq_ft: '0', //'1500 - 2000',
      zip_code: '29000',
      email: 'hello@world.com',
      //
      bedrooms: '0 - Studio',
      date: new Date('2022-12-17T03:24:00'),
      phone: '807465486',
      //
      bathrooms: '1',
      select_times: 'Afternoon',
    };
    Object
      .entries(example)
      .forEach(keyValue => {
        log('v:', keyValue)
        this.form_1_1.controls[keyValue[0]].setValue(keyValue[1])
      });
  }

  fill_2(stepperDOM: MatStepper) {
    // Step 2
  }

  fill_3(stepperDOM: MatStepper) {
    const example2 = {
      first_name: 'example',
      zip_code: '29000', // <--- <--- <--- <--- <--- <--- <--- <--- <--- <--- <---  DUPLICATE !!!
      //
      last_name: 'example',
      city: 'City',
      doorAccess: 'Client will let us in',
      //
      address: 'Some address',
      state: 'NY',
      specialInstructions: 'Some instructions',
      //
      // selectTime: 'Morning', // <--- <--- <--- <--- <--- <--- <--- <--- <--- <--- <--- ???
      aptSuite: 'Apt/Suite',
      howDidYouHear: 'Some history'
    };
    Object
      .entries(example2)
      .forEach(keyValue => {
        log('v:', keyValue)
        this.form_1_3.controls[keyValue[0]].setValue(keyValue[1])
      });
  }

  checkFormGroup(groupName: any) {
    if (!groupName) groupName = 'residential';
    this.form_1_1.controls['checkedGroup'].setValue(groupName);
  }

  showMe(elm: any) {
    log(elm);
  }

  preventEmpty: any = (value: any) => (value == '') ? '-' : value; // for view fill '-' if ''
  // preventEmptyDate: any = (value: any) => (value == '') ? '-/-/-' : value; // for view fill of date '-/-/-' if ''

  amount(item: any, _do: string) {
    // if (_do == '+') item.amount += 10;
    // if (_do == '-' && item.amount > 10) item.amount -= 10;
    if (_do == '+') item.amount++;
    if (_do == '-' && item.amount > 1) item.amount--;
  }

  valueOf(key: string) {
    return this.form_1_2.controls[key].value;
  }

  stopPropagation(e: any) {
    e.stopPropagation();
  }

  // zip code check added by Taras 07/17/21
  errorFlag: boolean = false;
  public zipObj: any;
  async checkZipCode(value: any) {
    await this._form.checkZipCode1(value, this.errorFlag, this.zipObj);
    this.errorFlag = this._form.errorFlag;
    this.zipObj = this._form.zipObj;
    console.log(this._form.errorFlag);
  }

  // crutches for material components: refresh the view of fields
  get frequency() {
    return this.form_1_1.controls['frequency'].value;
  }

  get frequency_2() {
    return this.form_1_2.controls['frequency'].value;
  }

  get cleaning_type() {
    return this.form_1_1.controls['cleaning_type'].value;
  }

  get bedrooms() {
    let value = this.form_1_1.controls['bedrooms'].value;
    if (value == '0 - Studio') value = '0';
    return value
  }

  get bathrooms() {
    return this.form_1_1.controls['bathrooms'].value;
  }

  get checkedGroup() {
    return this.form_1_1.controls['checkedGroup'].value;
  }

  get date() {
    return this.form_1_1.controls['date'].value;
  }

  get sq_ft() {
    return this.form_1_1.controls['sq_ft'].value;
  }

  get select_times() {
    return this.form_1_1.controls['select_times'].value;
  }

  // extras
  get extras_fridge() {
    return this.form_1_2.controls['extras_fridge'].value;
  }

  get extras_oven() {
    return this.form_1_2.controls['extras_oven'].value;
  }

  get extras_cabinet() {
    return this.form_1_2.controls['extras_cabinet'].value;
  }

  get extras_washer() {
    return this.form_1_2.controls['extras_washer'].value;
  }

  get extras_window() {
    return this.form_1_2.controls['extras_window'].value;
  }

  get extras_vacuum_sofa() {
    return this.form_1_2.controls['extras_vacuum_sofa'].value;
  }

  get terms() {
    return this.form_1_4.controls['terms'].value;
  }

  get payBy() {
    return this.stripePaymentForm.controls['payBy'].value;
  }

  // extras list

  get extras_list() {
    return [
      { stepKey: 'fridge', formKey: 'extras_fridge', value: this.extras_fridge },
      { stepKey: 'oven', formKey: 'extras_oven', value: this.extras_oven },
      { stepKey: 'cabinet', formKey: 'extras_cabinet', value: this.extras_cabinet },
      { stepKey: 'washer', formKey: 'extras_washer', value: this.extras_washer },
      { stepKey: 'window', formKey: 'extras_window', value: this.extras_window },
      { stepKey: 'vacuum_sofa', formKey: 'extras_vacuum_sofa', value: this.extras_vacuum_sofa },
    ];
  }

  getExtrasByKey(k: any) {
    return this.stepper.extras.items.filter((item: any) => item.value == k)
  }

  getExtrasTextByKey(k: any) {
    const obj = this.getExtrasByKey(k);
    return obj[0].text
  }

  getExtrasTotalByKey(k: any) {
    const obj = this.getExtrasByKey(k);
    const amount = obj[0].amount;
    const price = obj[0].price;
    return amount * price
  }

  // added by Taras 04/26/2021
  collectData() {
    //console.log(this.form.value)
    const name = this.form_1_3.value.first_name.toLowerCase();
    const collectedData = {
      name: name,
      last_name: this.form_1_3.value.last_name,
      address: this.form_1_3.value.address,
      city: this.form_1_3.value.city,
      state: this.form_1_3.value.state,
      zip_code: this.form_1_3.value.zip_code,
      phone: this.form_1_1.value.phone,
      email: this.form_1_1.value.email,
      //date: this.form_1_1.value.date, // date
      period: this.form_1_1.value.select_times, // day time
      cleaning_type: this.form_1_1.value.cleaning_type, // cleaning type
      property_type: this.form_1_1.value.property_type, // property type
      frequency: this.form_1_1.value.frequency, // frequency
      sq_ft: this.form_1_1.value.sq_ft, // sq.ft
      bedrooms: this.form_1_1.value.bedrooms, // bedrooms
      bathrooms: this.form_1_1.value.bathrooms, // bathrooms
      //first_name: this.form_1_3.value.first_name, // first name
      suite: this.form_1_3.value.aptSuite, // house number
      price: this.calculatePipe.total, // price
      extras: { // extras
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      doorAccess: this.form_1_3.value.doorAccess, // door access info*
      specialInstructions: this.form_1_3.value.specialInstructions, // special instructions
      howDidYouHear: this.form_1_3.value.howDidYouHear,  // how did you hear about us
      payBy: this.stripePaymentForm.value.payBy // paying method
    }
    this._api.sendBookingData(collectedData)
      .subscribe(response => console.log(response))

  }
  // get booking date added by Taras 05/01/2021
  getDate() {
    //console.log(this.calculatePipe)
    const bookingDate = {
      date: this.form_1_1.value.date, // date
      period: this.form_1_1.value.select_times, // day time
      cleaning_type: this.form_1_1.value.cleaning_type, // cleaning type
      property_type: this.form_1_1.value.property_type, // property type
      frequency: this.form_1_1.value.frequency, // frequency
      sq_ft: this.form_1_1.value.sq_ft, // sq.ft
      bedrooms: this.form_1_1.value.bedrooms, // bedrooms
      bathrooms: this.form_1_1.value.bathrooms, // bathrooms
      phone: this.form_1_1.value.phone,
      first_name: this.form_1_3.value.first_name, // first name
      last_name: this.form_1_3.value.last_name, // last name
      city: this.form_1_3.value.city, // city
      address: this.form_1_3.value.address, // address
      suite: this.form_1_3.value.aptSuite, // house number
      state: this.form_1_3.value.state, // state
      zip_code: this.form_1_1.value.zip_code, // zip code
      price: this.calculatePipe.total, // price
      email: this.form_1_1.value.email, // email
      extras: { // extras
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      doorAccess: this.form_1_3.value.doorAccess, // door access info*
      specialInstructions: this.form_1_3.value.specialInstructions, // special instructions
      howDidYouHear: this.form_1_3.value.howDidYouHear,  // how did you hear about us
      payBy: this.stripePaymentForm.value.payBy // paying method
    }
    this._api.sendDate(bookingDate)
      .subscribe((response: any) => console.log(response))
    //console.log(this.form_1_1.value.date, this.form_1_1.value.select_times)
  }

  // for testing
  getTestDate() {
    //console.log(this.calculatePipe)
    const bookingDate = {
      date: this.form_1_1.value.date,
      period: this.form_1_1.value.select_times,
      cleaning_type: this.form_1_1.value.cleaning_type,
      property_type: this.form_1_1.value.property_type,
      frequency: this.form_1_1.value.frequency,
      sq_ft: this.form_1_1.value.sq_ft,
      bedrooms: this.form_1_1.value.bedrooms,
      bathrooms: this.form_1_1.value.bathrooms,
      phone: this.form_1_1.value.phone,
      first_name: this.form_1_3.value.first_name,
      last_name: this.form_1_3.value.last_name,
      city: this.form_1_3.value.city,
      address: this.form_1_3.value.address,
      state: this.form_1_3.value.state,
      zip_code: this.form_1_1.value.zip_code,
      //price: this.calculatePipe
    }
    this._api.sendTestDate(bookingDate)
      .subscribe((response: any) => console.log(response))
    //console.log(this.form_1_1.value.date, this.form_1_1.value.select_times)
  }

  getExtraItem(value) {
    return this.stepper.extras.items.filter(o => o.value == value)[0]
  }

  sendBookingEmail() {
    const parseDate = this.form_1_1.value.date.toISOString().split('T')[0];
    const emailData = {
      company_name: this.form_1_3.value.last_name,
      name: this.form_1_3.value.first_name,
      phone: this.form_1_1.value.phone,
      email: this.form_1_1.value.email,
      frequency: this.form_1_1.value.frequency,
      sq_ft: this.form_1_1.value.sq_ft,
      time: parseDate,
      period: this.form_1_1.value.select_times,
      address: this.form_1_3.value.address,
      zip_code: this.form_1_1.value.zip_code,
      cleaning_type: this.form_1_1.value.cleaning_type,
      property_type: this.form_1_1.value.property_type,
      bedrooms: this.form_1_1.value.bedrooms,
      extras: {
        extras_fridge: (this.form_1_2.value.extras_fridge) ? this.getExtraItem('fridge') : null,
        extras_oven: (this.form_1_2.value.extras_oven) ? this.getExtraItem('oven') : null,
        extras_cabinet: (this.form_1_2.value.extras_cabinet) ? this.getExtraItem('cabinet') : null,
        extras_washer: (this.form_1_2.value.extras_washer) ? this.getExtraItem('washer') : null,
        extras_window: (this.form_1_2.value.extras_window) ? this.getExtraItem('window') : null,
        extras_vacuum_sofa: (this.form_1_2.value.extras_vacuum_sofa) ? this.getExtraItem('vacuum_sofa') : null
      },
      price: this.calculatePipe
    }
    // log('emailData:::::::', emailData);
    this._api.sendMainBookingDataForm(emailData)
      .subscribe((response: any) => {
        if (response.ok) {
          console.log('email sent');
          //this.openSnackBar('You Have Booked an Appointment. Please Check Your Email', 'Thank you!'); 
        }
      }, err => this.openSnackBar(`${err} There Is some Error. Please Try Again Later`, 'Thank you!'));
  }

  bindFrequencyFields(value, who) {
    log('****', value);
    if (who == 1) this.form_1_2.controls.frequency.setValue(value);
    if (who == 2) this.form_1_1.controls.frequency.setValue(value);
  }

  switchByCleaningType() {
    if ((this.cleaning_type == 'Move cleaning')
      || (this.cleaning_type == 'Post construction cleaning')
      || (this.cleaning_type == 'Post renovation cleaning')) this.form_1_1.controls.frequency.setValue('One Time');
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const pickedDate = d || new Date();
    const todaysDate = new Date();
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return pickedDate >= todaysDate
  }

  // taras june 2021
  // card validator (if credit card)
  callType(value) {
    console.log(value);
    if (value == 'Pay by cash' || value == 'Pay by check') this.cardChecker = true
    else this.cardChecker = false;
    //console.log(this.creditCardCheck.controls)
  }

  // validateCard() {
  //   console.log(this.creditCardCheck.value.expiry);
  // }

  // modifyDigits(value) {
  //   console.log(value)
  // }


  myValidate() {
    //console.log(this.creditCardCheck.value)
    if (this.creditCardCheck.value.number == '' && this.creditCardCheck.value.expiry == '' && this.creditCardCheck.value.cvv == '' && this.creditCardCheck.value.name == '') {
      swal.fire({
        title: "Error",
        text: "Please Fill Out The Form",
        icon: "error",
        type: 'warning'
      });
      return;
    }
    const card = {
      number: this.creditCardCheck.value.number,
      expiration: this.creditCardCheck.value.expiry,
      expiryMonth: this.creditCardCheck.value.expiry.substring(0, 2),
      expiryYear: this.creditCardCheck.value.expiry.substring(3, this.creditCardCheck.value.expiry.length),
      cvv: this.creditCardCheck.value.cvv,
      name: this.creditCardCheck.value.name
    }
    this._api.sendCardValidation(card)
      .subscribe((response: any) => {
        console.log(response);
        if (response.ok) {
          //console.log('email sent');
          this.validationFlag = true;
          this.openSnackBar('Success! Please Continue And Press Place Order', 'Thank you!');
        }
      }, err => this.openSnackBarError(`${err} Internal Server Error`, 'Not Valid Card!'));
    //return true
  }



}


// { value: 'fridge', color: '#eaf3fb', text: 'Inside the Fridge', amount: 1, price: 30, mode: 'piece' },
// { value: 'oven', color: '#eaf3fb', text: 'Inside the Oven', amount: 1, price: 30, mode: 'piece' },
// { value: 'cabinet', color: '#dfe9f3', text: 'Inside the Cabinets', amount: 1, price: 30, mode: 'ranges' },
// { value: 'washer', color: '#dfe9f3', text: 'Load(s) of Laundry', amount: 1, price: 30, mode: 'piece' },
// { value: 'window', color: '#dfe9f3', text: 'Windows', amount: 1, price: 30, mode: 'ranges-5' },
// { value: 'vacuum_sofa', color: '#dfe9f3', text: 'Vacuum the Sofa', amount: 1, price: 30, mode: 'piece' },