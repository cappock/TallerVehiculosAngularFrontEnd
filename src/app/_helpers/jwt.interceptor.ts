import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../_services/employee/employee.service';
import { AuthOwnerService } from '../_services/owner/auth-owner.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private authOwnerService: AuthOwnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authenticationService.currentUserValue;
    const currentOwner = this.authOwnerService.currentOwnerValue;
    const isLoggedIn = (currentUser && currentUser.token) || (currentOwner && currentOwner.token) ;
    const isApiRest = request.url.startsWith(environment.apiRest);
    if (isLoggedIn && isApiRest) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      });
      if(currentOwner){
        request = request.clone({
          setHeaders: {
            'token': `${currentOwner.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json',
          },
        });
      }
    } else if (isApiRest) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
