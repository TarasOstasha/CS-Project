import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { pipe, Subject, Subscription, of } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.less']
})
export class BusinessFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm: any;
  businessBookForm!: FormGroup;
  quickBook: any = {
    approx_SF: {
      items: [
        { title: 'Under 1000' },
        { title: '1000 - 1200' },
        { title: '1200 - 1500' },
        { title: '1500 - 2000' },
        { title: '2000 - 2500' },
        { title: '2500 - 3000' },
        { title: '3000 - 3500' },
        { title: '3500 - 4000' },
        { title: '4500 - 5000' },
        { title: '5500 - 6000' },
        { title: '6500 - 7000' },
        { title: '7500 - 8000' },
        { title: '8500 - 9000' },
        { title: '9500 - 10000' }
      ]
    },
    bedrooms: {
      items: [
        { title: '0' },
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' },
        { title: '6' },
        { title: '7' },
        { title: '8' },
        { title: '9' },
        { title: '10' }
      ]
    },
    bathrooms: {
      items: [
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' },
        { title: '6' },
        { title: '7' },
        { title: '8' },
        { title: '9' },
        { title: '10' }
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
    zip_code: '',
    email: '',
    phone: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _form: FormService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.businessBookForm = this._formBuilder.group({
      company_name: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
      address: ['', [Validators.required]],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      approx_SF: ['', [Validators.required]]
    });

  }

  sendBusinessForm() {
    this._api.sendBusinessDataForm(this.businessBookForm.value)
      .subscribe((response: any) => {
      if(response.ok) {
        this.openSnackBar('You Have Booked an Appointment. Please Check Your Email', 'Thank you!'); 
        this.myForm.resetForm();
        setTimeout(() => {
          this._router.navigate(['main']);
        }, 4000)
      }  
    }, err => this.openSnackBar(`${err} There Is some Error. Please Try Again Later`, 'Thank you!'));
  }

  // popup menu after submitted form
  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top',
      panelClass: 'notif-success'
    });
  }


  // check if zip code valid
  errorFlag: boolean = false;
  public zipObj: any;
  async checkZipCode(value: any) {
    await this._form.checkZipCode1(value, this.errorFlag, this.zipObj);
    this.errorFlag = this._form.errorFlag;
    this.zipObj = this._form.zipObj;
  }



}
