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

  form!: FormGroup;
  isEditable = false;

  stepper: any = {
    // step - 1
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
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
      ]
    },
    date: '',
    bathrooms: {
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
      ]
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
    // step - 3
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
    this.stepperDOM.selectedIndex = 1;
    this.cdr.detectChanges();
  }

  // crutches for material components: refresh the view of fields
  get frequency() {
    return this.form.controls['frequency'].value;
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
    const example = {
      property_type: 'House',
      frequency: 'Monthly',
      approx_SF: '1500 - 2000',
      zip_code: '29000',
      email: 'hello@world.com',
      bedrooms: '12',
      date: new Date(),
      bathrooms: '5',
      select_times: 'Afternoon',
      phone: '+3807465486',
    };
    Object
      .entries(example)
      .forEach(keyValue =>
        this.form.controls[keyValue[0]].setValue(keyValue[1])
      );
  }

}


