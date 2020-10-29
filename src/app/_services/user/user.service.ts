import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Employee[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
      return this.http.get<Employee>(`${environment.apiUrl}/users/${id}`);
  }
}
