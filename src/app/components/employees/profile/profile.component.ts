import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';
import { RouterService } from 'src/app/_services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: Employee;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {

  }

}
