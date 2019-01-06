import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let _login = this.authService.getLoginUser();
      if (_login) {
        console.log(_login);
        console.log('(AuthGuard) OK <--');
        return true;
      }
      else {
        console.log('(AuthGuard) X <--');
        this.router.navigate(['login']);
        return false;
      }
    }
}
