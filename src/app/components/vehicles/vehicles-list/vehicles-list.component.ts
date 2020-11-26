import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/_models';
import { RouterService } from 'src/app/_services/router.service';
import { VehicleService } from 'src/app/_services/vehicle/vehicle.service';

import { faCar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehiclesListComponent implements OnInit {
  vehiclesList : Array<Vehicle> = [];

  faCar = faCar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe(vehicles => {
      this.vehiclesList = vehicles;
    });

  }
}
