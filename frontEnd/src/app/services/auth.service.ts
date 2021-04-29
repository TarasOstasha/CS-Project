import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;

  getIsAuth() {
    console.log(this.isAuthenticated)
    return this.isAuthenticated;
  }

  constructor() { }
}
