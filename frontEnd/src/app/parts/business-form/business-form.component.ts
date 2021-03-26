import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.less']
})
export class BusinessFormComponent implements OnInit {
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

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _form: FormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.businessBookForm = this._formBuilder.group({
      company_name: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
      zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ,Validators.pattern('^[0-9]*$')]],
      approx_SF: ['', [Validators.required]],
      frequency: ['', [Validators.required]]
    });
  }

  sendBusinessForm() {
    this._form.sendBusinessDataForm(this.businessBookForm.value);
    this.router.navigate(['/booking']);
  }

}
