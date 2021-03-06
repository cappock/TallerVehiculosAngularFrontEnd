import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './components/login/signup/signup.component';
import {SigninComponent} from './components/login/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import {EmployeesNavbarComponent} from './components/employees/employees-navbar/employees-navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {ProfileComponent} from './components/employees/profile/profile.component';
import {HomeNavbarComponent} from './components/home/home-navbar/home-navbar.component';
import {ClientsComponent} from './components/clients/clients.component';
import {EmployeesComponent} from './components/employees/employees.component';
import { VehicleComponent } from './components/employees/vehicles/vehicle/vehicle.component';
import { OwnersListComponent } from './components/employees/vehicles/owners-list/owners-list.component';
import { MatCardModule } from '@angular/material/card';
import { VehiclesListComponent } from './components/employees/vehicles/vehicles-list/vehicles-list.component';
import { OwnerComponent } from './components/employees/owners/owner/owner.component';
import { ClientVehiclesComponent } from './components/clients/client-vehicles/client-vehicles.component';
import { ClientsNavbarComponent } from './components/clients/clients-navbar/clients-navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwnersViewComponent } from './components/employees/owners/owners-view/owners-view.component';
import { ClientsProfileComponent } from './components/clients/clients-profile/clients-profile.component';
import { RepairDetailComponent } from './components/employees/vehicles/repair-detail/repair-detail.component';
import {MatListModule} from '@angular/material/list';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VehicleHistoryComponent } from './components/clients/client-vehicles/vehicle-history/vehicle-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    EmployeesNavbarComponent,
    ProfileComponent,
    EmployeesComponent,
    HomeNavbarComponent,
    ClientsComponent,
    VehicleComponent,
    OwnersListComponent,
    VehiclesListComponent,
    OwnerComponent,
    ClientVehiclesComponent,
    ClientsNavbarComponent,
    OwnersViewComponent,
    ClientsProfileComponent,
    RepairDetailComponent,
    VehicleHistoryComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatListModule,
    SweetAlert2Module
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
