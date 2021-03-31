import { Injectable } from '@angular/core';
import { quickBookForm } from '../interfaces/quickForm-data.model';
import { businessBookForm } from '../interfaces/businessForm-data.model';
import { officeBookForm } from '../interfaces/officeBookForm-data.model';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  formData: any = {};
  businessFormData: any = {};
  officeFormData: any = {};
  constructor() { }

  // quick review form data
  sendDataForm(value: quickBookForm) {
    console.log(value)
    this.formData = value;
  }

  // form which should be use for construction and renovation services
  sendBusinessDataForm(value: businessBookForm) {
    console.log(value);
    this.businessFormData = value;
  }

  // form which should be use for office service
  sendOfficeDataForm(value: officeBookForm) {
    console.log(value);
    this.officeFormData = value;
  }
}
