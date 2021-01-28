import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
              private repairDetailService: RepairDetailService,
              private router: Router              ) {
  }

  ngOnInit(): void {
    this.plate = this.route.snapshot.paramMap.get('plate');
    console.log(this.router.url.split('/')[1]);
    if(this.router.url.split('/')[1] === 'clients'){
      this.repairDetailService.getAll(this.plate).subscribe(response => {
        this.history = response;
       
      });
    }else{
      this.repairDetailService.getAllEmployees(this.plate).subscribe(response => {
        this.history = response;
        console.log(response)
      });
    }

  }
}
