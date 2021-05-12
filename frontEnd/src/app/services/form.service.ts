import { Injectable } from '@angular/core';
import { quickBookForm } from '../interfaces/quickForm-data.model';
import { businessBookForm } from '../interfaces/businessForm-data.model';
import { officeBookForm } from '../interfaces/officeBookForm-data.model';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  formData: any = {};
  // businessFormData: any = {};
  // officeFormData: any = {};
  
  constructor(private _api: ApiService) { }

  // quick review form data
  sendDataForm(value: quickBookForm) {
    console.log(value, 'value from quick booking')
    this.formData = value;
  }

  // check zip code
  errorFlag: boolean = false; // show error msg if not valid zip
  public zipObj: any; // use current value to show correct county in the view
  async checkZipCode1(value: any, errorFlag: boolean, zipObj: any) {
    try {
      //console.log(value.target.value)
      const zipCode = value.target.value;//.substr(1); // remove first symbol
      const where = encodeURIComponent(JSON.stringify({
        "US_Zip_Code": +zipCode
      }));

      const response = await fetch(
        `https://parseapi.back4app.com/classes/Uszipcode_US_Zip_Code?limit=10&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'pj4KefXOJu9bSYoEZfTz5GK7y7UcSfWx0Xma7HWo', // This is your app's application id
            'X-Parse-REST-API-Key': '1P9RXVt4WzuXPNK9VSAg84T1xssLnthslmPExhIL', // This is your app's REST API key
          }
        }
      );
      
      const data = await response.json(); // Here you have the data that you need
      //console.log(JSON.stringify(data, null, 2));
      //this.zipObj = data.results[0].County; //JSON.parse(data); // if this.zipObj !== 'Hudson County' || this.zipObj !== 'New York County' || this.zipObj !== 'Bronx County' || this.zipObj !== 'Brooklyn' || this.zipObj !== 'Queens County' || this.zipObj !== 'Staten Island'
        console.log(data, 'data')
      if(
        data.results[0].County == 'Hudson County' || 
        data.results[0].County == 'New York County' || 
        data.results[0].County == 'Bronx County' || 
        //data.results[0].County == 'Brooklyn' || 
        data.results[0].County == 'Queens County' || 
        //data.results[0].County == 'Staten Island' || 
        data.results[0].County == 'Richmond County' ||
        data.results[0].County == 'Kings County'
      ) {
        console.log('there is a valid value');
        this.errorFlag = false;
        this.zipObj = data.results[0].County; //JSON.parse(data); 
        
      } else {
        this.errorFlag = true;
        this.zipObj = null;
        console.log('there is a not valid value');
        return
      }
      console.log(this.zipObj, 'zipObj');
    } catch (error) {
      //console.log(error);
    }

  }


}
