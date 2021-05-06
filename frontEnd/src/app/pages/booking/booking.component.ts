import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { FormService } from '../../services/form.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
const log = console.log;
declare var window: any;
declare var stripe: any;
declare var elements: any;

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

  stripePaymentForm!: FormGroup;

  isEditable = false;
  // checkedGroup: string = 'residential';

  createItems(amount: number) {
    const arr = Array.from({ length: amount }, (v, k) => k + 1);
    return arr.map((el) => ({ title: el.toString() }))
  }
  createBedrooms() {
    const arr: any = this.createItems(10); // -> from 1 to 20: [{ title: '1' }, { title: n }]
    arr.unshift({ title: '0 - Studio' });
    return arr
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
        { title: 'Weekly', color: '#1976d2', price: 123 }, // MATERIAL COLORS: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=1976D2
        { title: 'Biweekly', color: '#1976d2', price: 139 },
        { title: 'Monthly', color: '#1976d2', price: 156 },
        { title: 'One Time', color: '#1976d2', price: 160 },
      ]
    },
    sq_ft: {
      items: [
        { title: 'Under 1000' },
        { title: '1000 - 1200' },
        { title: '1200 - 1500' },
        { title: '1500 - 2000' },
        { title: '2000 - 2500' },
        { title: '2500 - 3000' },
        { title: '3000 - 3500' },
      ]
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
        { value: 'window', color: '#dfe9f3', text: 'Windows', amount: 1, price: 30, mode: 'ranges-5' },
        { value: 'vacuum_sofa', color: '#dfe9f3', text: 'Vacuum the Sofa', amount: 1, price: 30, mode: 'piece' },
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
        { title: 'Secure Key holding with eMails' },
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
  };

  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _form: FormService,
    private _api: ApiService,
    private _activatedRoute: ActivatedRoute
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

    setInterval(() => {
      log(this._form.formData);
      log(this.form_1_1);
    }, 1000);

    // the fix
    setTimeout(() => {
      this.checkFormGroup('residential')
    }, 300);

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

    this.form = this._formBuilder.group({
    });

    // setInterval(() => {
    //   // this.form_1_1.reset();// = "VALID";
    //   // touched
    //   log('>>>', this.form_1_1)
    //   // log('>>>', this.form_1_3)
    // }, 2000)

    log('Can I GET FORM DATA& : ', this._form.formData);
    // set values from service
    const keys = Object.keys(this._form.formData);
    keys.forEach((key: any) => {
      // log('key - ', key);
      const serviceValue = this._form.formData[key];
      if (key == 'approx_SF') { // crutch
        this.form_1_1.controls.sq_ft.setValue(serviceValue);
      } else if (this.form_1_1.controls[key]) {
        log('key ---- ', key, serviceValue);
        this.form_1_1.controls[key].setValue(serviceValue);
      };
      // this.cdr.detectChanges();
    });

    this.stripePaymentForm = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });

  }




  placeOrder() {
    this.paymentTransaction();
  }

  paymentTransaction() {
    window.elementsModal.create({
      type: 'stripe',
      totalPrice: 100,
      // the modal demo will handle non-zero currencies automatically
      // items sent into the server can calculate their amounts and send back to the client
      //items: [{ sku: "sku_1234", quantity: 1 }],
      // Supported currencies here https://stripe.com/docs/currencies#presentment-currencies
      currency: "USD",
      businessName: 'test',
      productName: 'test1',
      customerEmail: 'test@gmail.com',
      customerName: 'Jack',
    });
  }

  ngAfterViewInit() {
    // move to appropriate tab menu (residential, office, commercial) when press from main page
    this._activatedRoute.queryParams.subscribe(params => {
      this.form_1_1.value.checkedGroup = params.type;
      //console.log(this.form_1_1.value.checkedGroup);
      //console.log(params); // Print the parameter to the console. 
      this.checkFormGroup(this.form_1_1.value.checkedGroup);
    });
    log('ngAfterViewInit');
    // this.stepperDOM.selectedIndex = 0;
    this.cdr.detectChanges();
  }

  get calculatePipe() {
    let subtotal: number = 0;
    // type
    if (this.cleaning_type == 'Deep cleaning') subtotal += 40;
    if (this.cleaning_type == 'Organic cleaning') subtotal += 10;
    if (this.cleaning_type == 'Move cleaning') subtotal += 40;
    if (this.cleaning_type == 'Post construction cleaning') subtotal += 160;
    if (this.cleaning_type == 'Post renovation cleaning') subtotal += 160;
    // bed bath
    const bedBath = this.bedrooms * this.stepper.bedrooms.price + this.bathrooms * this.stepper.bathrooms.price;
    subtotal += bedBath; //this.bedrooms + this.bathrooms;
    // frequency
    if (this.frequency == 'Weekly') subtotal += 10;
    if (this.frequency == 'Biweekly') subtotal += 10;
    if (this.frequency == 'Monthly') subtotal += 10;
    if (this.frequency == 'One Time') subtotal += 15;
    // sq.ft
    subtotal += this.standard; // standard
    if (this.sq_ft == '1000 - 1200') subtotal += 20;
    if (this.sq_ft == '1200 - 1500') subtotal += 20;
    if (this.sq_ft == '1500 - 2000') subtotal += 30;
    if (this.sq_ft == '2000 - 2500') subtotal += 30;
    if (this.sq_ft == '2500 - 3000') subtotal += 30;
    if (this.sq_ft == '3000 - 3500') subtotal += 30;
    //extras
    if (this.extras_fridge) subtotal += this.getExtrasTotalByKey('fridge');
    if (this.extras_oven) subtotal += this.getExtrasTotalByKey('oven');
    if (this.extras_cabinet) subtotal += this.getExtrasTotalByKey('cabinet');
    if (this.extras_washer) subtotal += this.getExtrasTotalByKey('washer');
    if (this.extras_window) subtotal += this.getExtrasTotalByKey('window');
    if (this.extras_vacuum_sofa) subtotal += this.getExtrasTotalByKey('vacuum_sofa');
    // tax
    const tax = this.percentage(this.tax, subtotal);
    // total
    const total = subtotal + tax;
    // recommend time for cleaning
    const recommendTime = Math.round(subtotal / 40);
    return {
      bedBath,
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
      cleaning_type: 'Organic cleaning',
      property_type: 'House',
      frequency: 'Monthly',
      //
      sq_ft: '1500 - 2000',
      zip_code: '29000',
      email: 'hello@world.com',
      //
      bedrooms: '2',
      date: new Date(),
      phone: '807465486',
      //
      bathrooms: '2',
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

  get cleaning_type() {
    return this.form_1_1.controls['cleaning_type'].value;
  }

  get bedrooms() {
    return this.form_1_1.controls['bedrooms'].value;
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
    console.log(this.form.value)
    const name = this.form_1_3.value.first_name.toLowerCase();
    const collectedData = {
      name: name,
      last_name: this.form_1_3.value.last_name,
      address: this.form_1_3.value.address,
      city: this.form_1_3.value.city,
      state: this.form_1_3.value.state,
      zip_code: this.form_1_3.value.state,
      phone: this.form_1_1.value.phone,
      email: this.form_1_1.value.email
    }
    this._api.sendBookingData(collectedData)
      .subscribe(response => console.log(response))

  }
  // get booking date added by Taras 05/01/2021
  getDate() {
    //console.log(this.calculatePipe)
    const bookingDate = {
      date: this.form_1_1.value.date,
      period: this.form_1_1.value.select_times,
      cleaning_type: this.form_1_1.value.cleaning_type,
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
    this._api.sendDate(bookingDate)
      .subscribe((response: any) => console.log(response))
    //console.log(this.form_1_1.value.date, this.form_1_1.value.select_times)
  }

}


// { value: 'fridge', color: '#eaf3fb', text: 'Inside the Fridge', amount: 1, price: 30, mode: 'piece' },
// { value: 'oven', color: '#eaf3fb', text: 'Inside the Oven', amount: 1, price: 30, mode: 'piece' },
// { value: 'cabinet', color: '#dfe9f3', text: 'Inside the Cabinets', amount: 1, price: 30, mode: 'ranges' },
// { value: 'washer', color: '#dfe9f3', text: 'Load(s) of Laundry', amount: 1, price: 30, mode: 'piece' },
// { value: 'window', color: '#dfe9f3', text: 'Windows', amount: 1, price: 30, mode: 'ranges-5' },
// { value: 'vacuum_sofa', color: '#dfe9f3', text: 'Vacuum the Sofa', amount: 1, price: 30, mode: 'piece' },