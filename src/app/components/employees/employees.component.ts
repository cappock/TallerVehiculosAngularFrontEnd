import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  authenticatedUser: any = null;

  constructor() {
  }

  ngOnInit(): void {
    this.authenticatedUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }
}
