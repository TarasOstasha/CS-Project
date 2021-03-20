import { Injectable } from '@angular/core';
import { quickBookForm } from '../interfaces/quickForm-data.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formData: any = {};
  constructor() { }

  // quick review form data
  sendDataForm(value: quickBookForm) {
    console.log(value)
    this.formData = value;
  }
}
