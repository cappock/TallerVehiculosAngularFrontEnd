import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Owner, Vehicle } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<Owner>(`${environment.apiRest}/api/v1/owners/me`);
  }

  getMyVehicles(){
    return this.http.get<Array<Vehicle>>(`${environment.apiRest}/api/v1/owners/vehicles`);
  }

  getOwner(identity_card: string){
    return this.http.get<Owner>(`${environment.apiRest}/api/v1/owners/${identity_card}`);
  }

  getAll(){
    return this.http.get<Array<Owner>>(`${environment.apiRest}/api/v1/owners`);
  }

  search(string: string){
    return this.http.get<Array<Owner>>(`${environment.apiRest}/api/v1/owners/search?${string}`);
  }

  create(owner: Owner){
    return this.http
    .post<any>(`${environment.apiRest}/api/v1/owners`, owner)
    .pipe(
      map((owner) => {
        if (owner) {
          console.log('Owner Created with success');
        }
      })
    );
  }

  update(owner: Owner){
    return this.http
    .patch<any>(`${environment.apiRest}/api/v1/owners/${owner.identity_card}`, owner)
    .pipe(
      map((owner) => {
        if (owner) {
          console.log('Owner Update with success');
        }
      })
    );
  }
}
