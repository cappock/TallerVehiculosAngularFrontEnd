import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/employees/profile/profile.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { VehicleComponent } from './components/vehicles/vehicle/vehicle.component';
import { OwnerComponent } from './components/owners/owner/owner.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'login', component: SigninComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/employees/profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'register',
        component: SignupComponent,
        canActivate: [AuthGuard],
        data: { roles: Role.assistant },
      },
      {
        path: 'vehicle/:plate',
        component: VehicleComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.technician, Role.supervisor, Role.assistant] },
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.technician, Role.supervisor, Role.assistant] },
      },
      {
        path: 'owner/:identity_card',
        component: OwnerComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.technician, Role.supervisor, Role.assistant] },
      },
      {
        path: 'owner',
        component: OwnerComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.technician, Role.supervisor, Role.assistant] },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
