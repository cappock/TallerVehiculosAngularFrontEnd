import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {}
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  signOut() {
    this.authenticationService.signOut();
    console.log("hola")
    this.router.navigate(['signin']);
  }
}
