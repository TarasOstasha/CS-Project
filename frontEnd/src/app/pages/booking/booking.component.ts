import { Component, OnInit } from '@angular/core';
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
export class BookingComponent implements OnInit {

  step_1!: FormGroup;
  isEditable = false;

  stepper: any = {
    property_type: {
      items: [
        { title: 'Apartment' },
        { title: 'House' },
        { title: 'AirBNB' },
      ]
    },
    frequency: {
      items: [
        { title: 'Weekly' },
        { title: 'Biweekly' },
        { title: 'Monthly' },
        { title: 'One Time' },
      ]
    }
  };

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.step_1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  goBack(stepperDOM: MatStepper) {
    stepperDOM.previous();
  }

  // goForward(stepperDOM: MatStepper) {
  //   stepperDOM.next();
  // }

  next1(stepperDOM: MatStepper){
    if (this.step_1.status== "VALID") stepperDOM.next()
    else log('Must fill!');
  }

  fill(stepperDOM: MatStepper) {
    // log(stepperDOM);
    log(this.step_1);

    
  }

}
