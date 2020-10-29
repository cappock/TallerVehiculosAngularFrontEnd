import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Employee} from 'src/app/_models';
import {environment} from 'src/environments/environment';
import {EmployeeService} from '../employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<Employee>;
  private currentUserSubject: BehaviorSubject<Employee>;

  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Employee {
    return this.currentUserSubject.value;
  }

  signIn(username: string, password: string): any {

    const params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);

    return this.http.post<any>(`${environment.apiRest}/api/v1/login/access-token`, params.toString())
      .pipe(map(user => {
        if (user && user.access_token) {
          const employee: Employee = new Employee();
          employee.token = user.access_token;
          localStorage.setItem('currentUser', JSON.stringify(employee));
          this.currentUserSubject.next(employee);
          console.log('hola1')
          this.employeeService.getMe().subscribe(data => {
            employee.identity_card = data.identity_card;
            employee.email = data.email;
            employee.surnames = data.surnames;
            employee.names = data.names;
            employee.username = data.username;
            employee.phone = data.phone;
            employee.role = data.role;
            localStorage.setItem('currentUser', JSON.stringify(employee));
            this.currentUserSubject.next(employee);
            console.log(employee);
          });
        }
        return user;
      }));
  }

  signOut(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
