import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000/';

  constructor() { }
}
