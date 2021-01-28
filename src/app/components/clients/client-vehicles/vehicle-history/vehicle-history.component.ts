import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RepairDetailService} from '../../../../_services/vehicle/repair-detail.service';
import {RepairDetail} from '../../../../_models/repair-detail';
import {Vehicle} from '../../../../_models';

@Component({
  selector: 'app-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss']
})
export class VehicleHistoryComponent implements OnInit {
  plate: string;
  history: Array<RepairDetail> = [];

  constructor(private route: ActivatedRoute,
              private repairDetailService: RepairDetailService) {
  }

  ngOnInit(): void {
    this.plate = this.route.snapshot.paramMap.get('plate');
    this.repairDetailService.getAll(this.plate).subscribe(response => {
      this.history = response;
    });
  }
}
