import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models';
import { AuthOwnerService } from 'src/app/_services/owner/auth-owner.service';
import { RouterService } from 'src/app/_services/router.service';

@Component({
  selector: 'app-clients-navbar',
  templateUrl: './clients-navbar.component.html',
  styleUrls: ['./clients-navbar.component.scss']
})
export class ClientsNavbarComponent implements OnInit {
  activeLink = 'vehicles';
  currentOwner: Owner;


  constructor(
    private routerService: RouterService,
    private authenticationService: AuthOwnerService
  ) { 
    this.authenticationService.currentOwner.subscribe(
      (x) => (this.currentOwner = x)
    );
  }

  ngOnInit(): void {
    this.activateLink(this.routerService.getLatestRoutePath());
  }

  activateLink(link: string): void {
    this.activeLink = link;
  }

  signOut(): void {
    this.authenticationService.signOut();
    this.routerService.redirectHome();
  }
}
