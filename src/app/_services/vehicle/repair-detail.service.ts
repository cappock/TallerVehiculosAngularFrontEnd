import { Injectable } from '@angular/core';
import { RepairDetail } from 'src/app/_models/repair-detail';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepairDetailService {

  constructor(private http: HttpClient) { }

  getRepairDetail(plate: string, repair_id: number){
    return this.http.get<RepairDetail>(`${environment.apiRest}/api/v1/vehicles/${plate}/reparation-details/${repair_id}`);
  }

  getAll(plate : string){
    return this.http.get<Array<RepairDetail>>(`${environment.apiRest}/api/v1/vehicles/${plate}/reparation-details`);
  }

  create(plate: string, repairDetail: RepairDetail){
    console.log(repairDetail);
    return this.http
    .post<any>(`${environment.apiRest}/api/v1/vehicles/${plate}/reparation-details`, repairDetail)
    .pipe(
      map((repairDetail) => {
        if (repairDetail) {
          console.log('Repair Detail created with success');
        }
      })
    );
  }

  update(plate: string, repairDetail: RepairDetail){
    return this.http
    .patch<any>(`${environment.apiRest}/api/v1/vehicles/${plate}/reparation-details/${repairDetail.id}`, repairDetail)
    .pipe(
      map((vehicle) => {
        if (vehicle) {
          console.log('Repair Detail update with success');
        }
      })
    );
  }

  delete(plate: string, repair_id: number ){
    return this.http
    .delete<any>(`${environment.apiRest}/api/v1/owners/vehicle/${plate}/reparation-details/${repair_id}`);  
  }
}
