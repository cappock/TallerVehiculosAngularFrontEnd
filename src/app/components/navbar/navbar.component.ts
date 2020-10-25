import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, Employee } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: Employee;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {}

  get isManager() {
    return this.currentUser && this.currentUser.role === Role.manager;
  }

  get isTechnician() {
    return this.currentUser && this.currentUser.role === Role.technician;
  }

  get isAssistant() {
    return this.currentUser && this.currentUser.role === Role.assistant;
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['signin']);
  }
}
