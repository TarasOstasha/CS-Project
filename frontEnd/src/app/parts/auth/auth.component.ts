import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  hide = true;
  disabled = true;
  email: any;
  password: any;
  


  constructor(private _formBuilder: FormBuilder, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.pattern('^test1111$')] ]
    })
  }
  
  // getIsAuth() {
  //   return this.isAuthenticated;
  // }

  public isAuthenticated = false;

  sendAuthForm() {
    if( this.authForm.value.email == 'crystalsystemcleaning@gmail.com' && this.authForm.value.password == 'crystalsys' ) {
      this._auth.isAuthenticated = true;
      localStorage.setItem('state', 'true'); // set value to the local storage
      this._router.navigate(['admin']); 
    } 
  }

  // canActivate(): boolean {
  //   if (!this.isAuthenticated) {
  //     this._router.navigate(['auth']);
  //     return false;
  //   }
  //   return true;
  // }

}
