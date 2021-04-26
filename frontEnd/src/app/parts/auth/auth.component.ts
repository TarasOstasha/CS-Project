import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.pattern('^test1111$')] ]
    })
  }
  


  sendAuthForm() {
    if( this.authForm.value.email == 'test@gmail.com' && this.authForm.value.password == 'test1111' ) this._router.navigate(['admin']); 
  }

}
