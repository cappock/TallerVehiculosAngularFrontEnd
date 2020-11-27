import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models';
import { OwnerService } from 'src/app/_services/owner/owner.service';

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.scss']
})
export class ClientsProfileComponent implements OnInit {
  currentOwner: Owner = new Owner;
  constructor( private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.ownerService.getMe().subscribe(data => {
      this.currentOwner.fill(data);
    });
  }

}
