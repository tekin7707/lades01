import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from 'app/models/dataModel';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) {
   }

   intercept(req, next){
    var authService = this.injector.get(AuthService);
    var user = authService.getLoginUser();

    if(user)
    req = req.clone({
      headers: req.headers.set('Authorization','bearer '+user.token )
    });

      return next.handle(req);

   }

}
