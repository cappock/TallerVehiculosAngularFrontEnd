import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicle(plate: string){
    return this.http.get<Vehicle>(`${environment.apiRest}/api/v1/vehicles/${plate}`);
  }

  getAll(){
    return this.http.get<Array<Vehicle>>(`${environment.apiRest}/api/v1/vehicles`);
  }

  search(string: string){
    return this.http.get<Array<Vehicle>>(`${environment.apiRest}/api/v1/vehicles/search?${string}`);
  }

  create(vehicle: Vehicle){

    return this.http
    .post<any>(`${environment.apiRest}/api/v1/vehicles`, vehicle)
    .pipe(
      map((vehicle) => {
        if (vehicle) {
          console.log('Vehicle created with success');
        }
      })
    );
  }

  update(vehicle: Vehicle){
    console.log(vehicle)
    return this.http
    .patch<any>(`${environment.apiRest}/api/v1/vehicles/${vehicle.plate}`, vehicle)
    .pipe(
      map((vehicle) => {
        if (vehicle) {
          console.log('Vehiculo Actualizado Con Exito');
        }
      })
    );
  }

  addOwnerToVehicle(plate: string, identity_card: string ){
    return this.http
    .put<any>(`${environment.apiRest}/api/v1/vehicle/add-owner?${plate}`, identity_card)
    .pipe(
      map((vehicle) => {
        if (vehicle) {
          console.log('Propietario Agregado Con Exito');
        }
      })
    );
  }

  deleteOwnerOfVehicle(plate: string, identity_card: string ){
    return this.http
    .put<any>(`${environment.apiRest}/api/v1/vehicle/delete-owner?${plate}`, identity_card)
    .pipe(
      map((vehicle) => {
        if (vehicle) {
          console.log('Propietario Eliminado Con Exito');
        }
      })
    );
  }
}
