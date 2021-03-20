import { Injectable } from '@angular/core';
import { quickBookForm } from '../interfaces/quickForm-data.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }



  // quick review form data
  sendDataForm(value: quickBookForm) {
    console.log(value)
  }
}
