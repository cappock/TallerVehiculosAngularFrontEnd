import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { AuthOwnerService } from '../_services/owner/auth-owner.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authOwnerService: AuthOwnerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentOwner = this.authOwnerService.currentOwnerValue;
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUser.role) === -1
      ) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }
    if (currentOwner) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'You are logeed as a client, please log out and log in again with your management account'
      });
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return true;
  }
}
