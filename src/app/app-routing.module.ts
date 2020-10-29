import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {ProfileComponent} from './components/employees/profile/profile.component';
import {SignupComponent} from './components/login/signup/signup.component';
import {ClientsComponent} from './components/clients/clients.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'clients', component: ClientsComponent},
  {
    path: 'employees',  component: EmployeesComponent, children: [
      {path: '', redirectTo: '/employees/profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'register', component: SignupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
