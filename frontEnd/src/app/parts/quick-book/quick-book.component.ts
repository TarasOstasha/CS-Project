import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormService } from '../../services/form.service';
import { quickBookForm } from '../../interfaces/quickForm-data.model';

@Component({
  selector: 'app-quick-book',
  templateUrl: './quick-book.component.html',
  styleUrls: ['./quick-book.component.less']
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

}


