import {Component, OnInit} from '@angular/core';
import {Employee, Role} from 'src/app/_models';
import {AuthenticationService} from 'src/app/_services';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import {RouterService} from '../../../_services/router.service';

@Component({
  selector: 'app-employees-navbar',
  templateUrl: './employees-navbar.component.html',
  styleUrls: ['./employees-navbar.component.scss'],
})
export class EmployeesNavbarComponent implements OnInit {
  activeLink = 'register';
  currentUser: Employee;

  constructor(
    private routerService: RouterService,
    private authenticationService: AuthenticationService,    
    private employeeService: EmployeeService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;  
  }

  get isManager(): any {
    return this.currentUser && this.currentUser.role === Role.manager;
  }

  get isTechnician(): any {
    return this.currentUser && this.currentUser.role === Role.technician;
  }

  get isAssistant(): any {
    return this.currentUser && this.currentUser.role === Role.assistant;
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
