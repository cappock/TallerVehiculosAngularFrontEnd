import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models';
import { AuthenticationService } from 'src/app/_services';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { RouterService } from 'src/app/_services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: Employee = new Employee;

  constructor(
    private employeeService: EmployeeService
  ) {
    
  }

  ngOnInit(): void {
    this.employeeService.getMe().subscribe(data => {
      this.currentUser.fill(data)
      console.log(this.currentUser)
    });
  }
}
