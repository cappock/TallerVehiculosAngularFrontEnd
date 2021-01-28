import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RepairDetailService} from '../../../../_services/vehicle/repair-detail.service';
import {RepairDetail} from '../../../../_models/repair-detail';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss']
})
export class VehicleHistoryComponent implements OnInit {
  plate: string;
  history: Array<RepairDetail> = [];
  faEdit = faEdit;
  employeeView : boolean = false;

  constructor(private route: ActivatedRoute,
              private repairDetailService: RepairDetailService,
              private router: Router              ) {
  }

  ngOnInit(): void {
    this.plate = this.route.snapshot.paramMap.get('plate');
    console.log(this.router.url.split('/')[1]);
    this.employeeView = this.router.url.split('/')[1] === 'clients' ? false : true;
    if( !this.employeeView){
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
