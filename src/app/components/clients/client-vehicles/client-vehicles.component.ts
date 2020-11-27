import { Component, OnInit } from '@angular/core';

import { faCar } from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from 'src/app/_models';
import { OwnerService } from 'src/app/_services/owner/owner.service';
@Component({
  selector: 'app-client-vehicles',
  templateUrl: './client-vehicles.component.html',
  styleUrls: ['./client-vehicles.component.scss']
})
export class ClientVehiclesComponent implements OnInit {
  vehiclesList : Array<Vehicle> = [];

  faCar = faCar;

  constructor(
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.ownerService.getMyVehicles().subscribe(vehicles => {
      this.vehiclesList = vehicles;
    });
  }

}
