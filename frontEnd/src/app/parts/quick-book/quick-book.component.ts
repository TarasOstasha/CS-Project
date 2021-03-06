import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormService } from '../../services/form.service';
import { quickBookForm } from '../../interfaces/quickForm-data.model';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-quick-book',
  templateUrl: './quick-book.component.html',
  styleUrls: ['./quick-book.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class QuickBookComponent implements OnInit {
  quickBookForm!: FormGroup;
  

  //public emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  

  constructor(
    private _fb: FormBuilder, 
    private _form: FormService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.quickBookForm = this._fb.group({
      approx_SF: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      frequency: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ,Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')] ]
    });
  }

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

  sendQuickForm() {
    this._form.sendDataForm(this.quickBookForm.value);
    this.router.navigate(['/booking']);
    //console.log(this.quickBookForm.value);
  }



  
  // just for development
  fill() {
    const example = {
      approx_SF: '1500 - 2000',
      bedrooms: '1',
      bathrooms: '1',
      frequency: 'Monthly',
      zip_code: '29000',
      email: 'hello@world.com',
      phone: '5511111212',      
    };
    Object
      .entries(example)
      .forEach(keyValue =>
        this.quickBookForm.controls[keyValue[0]].setValue(keyValue[1])
      );
  }

   // check if zip code valid
   errorFlag: boolean = false;
   public zipObj: any;
   async checkZipCode(value: any) {
     await this._form.checkZipCode1(value, this.errorFlag, this.zipObj);
     this.errorFlag = this._form.errorFlag;
     this.zipObj = this._form.zipObj;
     console.log(this.errorFlag, this.zipObj)
   }

}


