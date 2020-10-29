import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getMe() {
    console.log('hola')
    return this.http.get<Employee>(`${environment.apiRest}/api/v1/employee/me`);
  }

  signUp(employee: Employee) {


    let params = new URLSearchParams();
    for (let key in employee) {
      params.set(key, employee[key]);
    }

    // params.set(JSON.stringify(employee), );
    return this.http
      .post<any>(`${environment.apiRest}/api/v1/employee`, employee)
      .pipe(
        map((employee) => {
          if (employee) {
            console.log('INGRESADO');
          }
        })
      );
  }
}
