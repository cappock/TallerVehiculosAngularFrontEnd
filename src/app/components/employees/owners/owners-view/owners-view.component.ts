import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models';

import {faEdit, faPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import { RouterService } from 'src/app/_services/router.service';
import { OwnerService } from 'src/app/_services/owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owners-view',
  templateUrl: './owners-view.component.html',
  styleUrls: ['./owners-view.component.scss']
})
export class OwnersViewComponent implements OnInit {
  ownersList : Array<Owner> = [];
  faPlus = faPlus;
  faEdit = faEdit;

  faUser = faUser;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private routerService: RouterService) { }

  ngOnInit(): void {
    this.ownerService.getAll().subscribe(owners => {
      this.ownersList = owners;
    });
  }

}
