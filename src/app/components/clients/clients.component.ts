import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {AuthOwnerService} from 'src/app/_services/owner/auth-owner.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  authenticatedUser: any;
  returnUrl: string;



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthOwnerService
  ) { }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.signInForm.controls;
  }

  ngOnInit(): void {
  
  }

  onSubmit(){

  }

}
