import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, Owner } from './_models';
import { AuthenticationService } from './_services';
import { AuthOwnerService } from './_services/owner/auth-owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: Employee;
  currentOwner: Owner;

  title = 'TallerVehiculosAngularFrontEnd';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authOwnerService: AuthOwnerService
  ) {
    this.authOwnerService.currentOwner.subscribe(
      (x) =>{
        this.currentOwner = x;
      }
    );
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  
  isloged(){
    if(this.currentUser || this.currentOwner){
      return true;
    }
    return false;
  }
}
