import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class BookingComponent implements OnInit {

  step_1!: FormGroup;
  isEditable = false;

  stepper: any = {
    property_type: {
      items: [
        {title: 'Apartment'},
        {title: 'House'},
        {title: 'AirBNB'},
      ]
    },
    frequency: {
      items: [
        {title: 'Weekly'},
        {title: 'Biweekly'},
        {title: 'Monthly'},
        {title: 'One Time'},
      ]
    }
  };

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.step_1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
