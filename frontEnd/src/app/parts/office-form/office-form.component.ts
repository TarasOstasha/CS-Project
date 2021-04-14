import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { pipe, Subject, Subscription, of } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.less']
})
export class OfficeFormComponent implements OnInit {
  
  @ViewChild(FormGroupDirective) myForm: any;
  officeBookForm!: FormGroup;
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
      ]
    },
    bedrooms: {
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
      ]
    },
    bathrooms: {
      items: [
        { title: '1' },
        { title: '... shoud be all ...' },
        { title: '19' },
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
    time: {
      items: [
       { title: 'Morning' },
       { title: 'Day' },
       { title: 'Night' }
      ]
    }
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _form: FormService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.officeBookForm = this._formBuilder.group({
      company_name: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
      address: ['',[Validators.required]],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
      approx_SF: ['', [Validators.required]],
      time: ['', [Validators.required]],
      frequency: ['', [Validators.required]]
    });
    window.scrollTo(0, 0); 
  }

  sendOfficeForm() {
    console.log(this.officeBookForm.controls.name);
    this._api.sendOfficeDataForm(this.officeBookForm.value)
    .subscribe((response: any) => {
      if(response.ok) {
        this.openSnackBar('You Have Booked an Appointment. Please Check Your Email', 'Thank you!'); 
        this.myForm.resetForm();
      }  
    }, err => this.openSnackBar(`${err} There Is some Error. Please Try Again Later`, 'Thank you!'));
    //this.router.navigate(['/booking']);
  }

  // popup menu after submitted form
  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }


  // check if zip code valid
  errorFlag: boolean = false;
  public zipObj: any;
  async checkZipCode(value: any) {
    await this._form.checkZipCode1(value, this.errorFlag, this.zipObj);
    this.errorFlag = this._form.errorFlag;
    this.zipObj = this._form.zipObj;
    //console.log(this._form.errorFlag);
  }
  // async checkZipCode(value: any) {
  //   try {
  //     console.log(value.target.value)
  //     const zipCode = value.target.value;//.substr(1); // remove first symbol
  //     const where = encodeURIComponent(JSON.stringify({
  //       "US_Zip_Code": +zipCode
  //     }));

  //     const response = await fetch(
  //       `https://parseapi.back4app.com/classes/Uszipcode_US_Zip_Code?limit=10&where=${where}`,
  //       {
  //         headers: {
  //           'X-Parse-Application-Id': 'pj4KefXOJu9bSYoEZfTz5GK7y7UcSfWx0Xma7HWo', // This is your app's application id
  //           'X-Parse-REST-API-Key': '1P9RXVt4WzuXPNK9VSAg84T1xssLnthslmPExhIL', // This is your app's REST API key
  //         }
  //       }
  //     );
      
  //     const data = await response.json(); // Here you have the data that you need
  //     console.log(JSON.stringify(data, null, 2));
  //     //this.zipObj = data.results[0].County; //JSON.parse(data); // if this.zipObj !== 'Hudson County' || this.zipObj !== 'New York County' || this.zipObj !== 'Bronx County' || this.zipObj !== 'Brooklyn' || this.zipObj !== 'Queens County' || this.zipObj !== 'Staten Island'

  //     if(
  //       data.results[0].County == 'Hudson County' || 
  //       data.results[0].County == 'New York County' || 
  //       data.results[0].County == 'Bronx County' || 
  //       data.results[0].County == 'Brooklyn' || 
  //       data.results[0].County == 'Queens County' || 
  //       data.results[0].County == 'Staten Island'
  //     ) {
  //       console.log('there is a valid value');
  //       this.zipObj = data.results[0].County; //JSON.parse(data); 
        
  //     } else {
  //       this.errorFlag = true;
  //       return
  //     }
  //     //console.log(this.zipObj);
  //   } catch (error) {
  //     //console.log(error);
  //   }

  // }



  

}
