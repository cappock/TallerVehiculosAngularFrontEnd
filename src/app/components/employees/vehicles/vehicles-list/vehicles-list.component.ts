import {Component, OnInit} from '@angular/core';
import {Vehicle} from 'src/app/_models';
import {VehicleService} from 'src/app/_services/vehicle/vehicle.service';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehiclesListComponent implements OnInit {
  vehiclesList: Array<Vehicle> = [];
  faPlus = faPlus;
  faEdit = faEdit;

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe(vehicles => {
      this.vehiclesList = vehicles;
    });

  }
}
