import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { FormService } from '../../services/form.service';
const log = console.log;

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
  isEditable = false;

  createItems(amount: number) {
    const arr = Array.from({ length: amount }, (v, k) => k + 1);
    return arr.map((el) => ({ title: el }))
  }
  stepper: any = {
    // step - 1
    checkedGroup: '',
    property_type: {
      items: [
        { title: 'Apartment' },
        { title: 'House' },
        { title: 'AirBNB' },
      ]
    },
    frequency: {
      items: [
        { title: 'Weekly', color: '#1976d2', price: 123 }, // MATERIAL COLORS: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=1976D2
        { title: 'Biweekly', color: '#c62828', price: 139 },
        { title: 'Monthly', color: '#c43e00', price: 156 },
        { title: 'One Time', color: '#2e7d32', price: 160 },
      ]
    },
    approx_SF: {
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
      items: this.createItems(20), // -> from 1 to 20: [{ title: '1' }, { title: n }]
      price: 20
    },
    date: '',
    bathrooms: {
      items: this.createItems(20), // -> from 1 to 20: [{ title: '1' }, { title: n }]
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
        { value: 'same_day', color: '#eaf3fb', text: 'Same Day Service' },
        { value: 'disinfection', color: '#eaf3fb', text: 'UV Disinfection', recommended: true },
        { value: 'cleaning', color: '#eaf3fb', text: 'Deep Cleaning' },
        { value: 'move', color: '#eaf3fb', text: 'Move In/Out Cleaning' },
        { value: 'wash', color: '#eaf3fb', text: 'Hand Wash Dishes' },
        { value: 'board', color: '#eaf3fb', text: 'Baseboards' },
        { value: 'fridge', color: '#eaf3fb', text: 'Inside the Fridge' },
        { value: 'oven', color: '#eaf3fb', text: 'Inside the Oven' },
        { value: 'cabinet', color: '#dfe9f3', text: 'Inside the Cabinets' },
        { value: 'washer', color: '#dfe9f3', text: 'Load(s) of Laundry' },
        { value: 'window', color: '#dfe9f3', text: 'Interior Windows' },
        { value: 'wall', color: '#dfe9f3', text: 'Interior Walls' },
        { value: 'pet', color: '#dfe9f3', text: 'Pet Hair Clean-up' },
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
        { title: '...' },
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
        { title: 'State some' },
        { title: '...' },
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
  ) { }

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
    this.form = this._formBuilder.group({
      checkedGroup: ['residential'],
      property_type: ['', Validators.required],
      frequency: ['', Validators.required,],
      approx_SF: ['', Validators.required],
      zip_code: ['', Validators.required],
      email: ['', Validators.required],
      bedrooms: ['', Validators.required],
      date: ['', Validators.required],
      bathrooms: ['', Validators.required],
      select_times: ['', Validators.required],
      phone: ['', Validators.required],
      extras_same_day: [''],
      extras_disinfection: [''],
      extras_cleaning: [''],
      extras_move: [''],
      extras_wash: [''],
      extras_board: [''],
      extras_fridge: [''],
      extras_refrigerator: [''],
      extras_oven: [''],
      extras_cabinet: [''],
      extras_washer: [''],
      extras_window: [''],
      extras_wall: [''],
      extras_pet: [''],
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
    });

    log('Can I GET FORM DATA& : ', this._form.formData);
    // set values
    const keys = Object.keys(this._form.formData);
    keys.forEach((key: any) => {
      log('key - ', key);
      const serviceValue = this._form.formData[key];
      if (serviceValue.length > 0) this.form.controls[key].setValue(serviceValue);
    });
  }

  ngAfterViewInit() {
    log('ngAfterViewInit');
    this.stepperDOM.selectedIndex = 3;
    this.cdr.detectChanges();
  }

  get calculatePipe() {
    const bedrooms = this.stepper.bedrooms.price * this.form.controls['bedrooms'].value
    const bathrooms = this.stepper.bathrooms.price * this.form.controls['bathrooms'].value
    const subtotal = this.standard + bedrooms + bathrooms;
    const tax = this.percentage(this.tax, subtotal);
    const total = subtotal + tax;
    return {
      subtotal,
      tax,
      total
    }
  }

  percentage(percent: number, total: number) {
    return +((total / 100) * percent).toFixed(2)
  }

  // crutches for material components: refresh the view of fields
  get frequency() {
    return this.form.controls['frequency'].value;
  }

  get checkedGroup() {
    return this.form.controls['checkedGroup'].value;

  }

  goBack(stepperDOM: MatStepper) {
    stepperDOM.previous();
  }

  // goForward(stepperDOM: MatStepper) {
  //   stepperDOM.next();
  // }

  next1(stepperDOM: MatStepper) {
    if (this.form.status == "VALID") stepperDOM.next()
    else log('Must fill!');
  }

  fill(stepperDOM: MatStepper) {
    // log(stepperDOM);
    // log(this.form);
    // log(this.form.value);
    // this.form.value.checkedGroup
    const example = {
      property_type: 'House',
      frequency: 'Monthly',
      approx_SF: '1500 - 2000',
      zip_code: '29000',
      email: 'hello@world.com',
      bedrooms: '1',
      date: new Date(),
      bathrooms: '1',
      select_times: 'Afternoon',
      phone: '+3807465486',
      first_name: 'example',
      last_name: 'example',
      city: 'City',
      doorAccess: 'Client will let us in',
      selectTime: 'Morning',
      address: 'Some address',
      state: 'State some',
      specialInstructions: 'Some instructions',
      aptSuite: 'Apt/Suite',
      howDidYouHear: 'Some history'
    };
    Object
      .entries(example)
      .forEach(keyValue =>
        this.form.controls[keyValue[0]].setValue(keyValue[1])
      );
  }

  cheakFormGroup(groupName: any) {
    this.form.controls['checkedGroup'].setValue(groupName);
  }

  showMe(elm: any) {
    log(elm);
  }

}


