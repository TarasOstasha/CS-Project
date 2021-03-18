import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
const log = console.log;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class BookingComponent implements OnInit, OnChanges  {
  @ViewChild('stepperDOM') stepperDOM!: MatStepper;

  steps!: FormGroup;
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
        { title: 'Weekly', color: 'blue' },
        { title: 'Biweekly', color: 'red' },
        { title: 'Monthly', color: 'orange' },
        { title: 'One Time', color: 'green' },
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
    private cdr: ChangeDetectorRef
  )
     { }

  /* 
    ngOnInit() is called after ngOnChanges(). 
    ngOnChanges() is called every time inputs are updated by change detection.
    ngAfterViewInit() is called after the view is initially rendered. This is why @ViewChild() depends on it. You can't access view members before they are rendered.

    ngOnInit() is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.
    ngAfterViewInit() is called after a component's view, and its children's views, are created. Its a lifecycle hook that is called after a component's view has been fully initialized.
  */

  ngOnChanges(){
    log('ngOnChanges');
  }

  ngOnInit() {
    log('ngOnInit');
    this.steps = this._formBuilder.group({
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
  }

  ngAfterViewInit() {
    log('ngAfterViewInit');
    this.stepperDOM.selectedIndex = 1;
    this.cdr.detectChanges();
  }

  // crutches for material components: refresh the view of fields
  get frequency() {
    return this.steps.controls['frequency'].value;
  }

  goBack(stepperDOM: MatStepper) {
    stepperDOM.previous();
  }

  // goForward(stepperDOM: MatStepper) {
  //   stepperDOM.next();
  // }

  next1(stepperDOM: MatStepper) {
    if (this.steps.status == "VALID") stepperDOM.next()
    else log('Must fill!');
  }

  fill(stepperDOM: MatStepper) {
    // log(stepperDOM);
    log(this.steps);
    log(this.steps.value);
  }


}
