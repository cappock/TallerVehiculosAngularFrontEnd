import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
 authenticatedUser: any = null;
  constructor() { }

  ngOnInit(): void {
    this.authenticatedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.authenticatedUser);
  }

}
