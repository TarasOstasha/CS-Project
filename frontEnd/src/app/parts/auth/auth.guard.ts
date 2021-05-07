import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _auth: AuthService,) {

  }


  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot, 
        state: import("@angular/router").RouterStateSnapshot
        ): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
            const isAuth = localStorage.getItem('state'); //this._auth.getIsAuth(); - method to use without localStorage
            if(!isAuth) {
                alert('Not Authorized!!! You Do not have permission to view this page')
                this._router.navigate(['/auth']);
            }
            return true; 
  }
  
}
