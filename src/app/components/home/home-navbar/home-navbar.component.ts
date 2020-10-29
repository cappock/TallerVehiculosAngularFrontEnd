import {Component, OnInit} from '@angular/core';
import {RouterService} from '../../../_services/router.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  activeLink = 'register';

  constructor(private routerService: RouterService) {
  }

  ngOnInit(): void {
    this.activateLink(this.routerService.getLatestRoutePath());
  }

  activateLink(link: string): void {
    this.activeLink = link;
  }
}
