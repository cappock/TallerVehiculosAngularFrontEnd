import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';
import { AuthOwnerService } from '../_services/owner/auth-owner.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsGuard implements CanActivate {

  constructor(
    private router: Router,
    private authOwnerService: AuthOwnerService,
    private authenticationService: AuthenticationService,  
  ){   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentOwner = this.authOwnerService.currentOwnerValue;
      const currentUser = this.authenticationService.currentUserValue;
      if (currentOwner) {        
          // authorised so return true
          return true;
      }

      if (currentUser){
        alert("You are logeed as a employee, please log out and log in again with your client account")
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      // not logged in so redirect to login page with the return url
  
      this.router.navigate(['/clientsAccess'], { queryParams: { returnUrl: state.url } });
      return false;
  }
  
}
