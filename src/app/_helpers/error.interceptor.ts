import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../_services';
import { catchError } from 'rxjs/operators';
import { consoleTestResultHandler } from 'tslint/lib/test';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ([401, 403].indexOf(err.status) !== -1) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              this.authenticationService.signOut();
              location.reload(true);
          }
          const error = err.error.detail || err.statusText;
          return throwError(error);
      }))
  }
}
