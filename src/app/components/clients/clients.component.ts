import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

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
  tokenAcces: boolean = false;

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
    this.signInForm = this.formBuilder.group({
      identity_card: ['identity-card', Validators.required],
      code: ['access-token', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  sendCode(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.sendAuthToken(this.f.identity_card.value)
      .pipe(first())
      .subscribe(
        data => {
          alert("Look your email to view the code, that we just send to you");
          this.f.code.errors = null;
          this.tokenAcces = true;
          this.loading = false;
          this.error = '';  
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  logIn(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.verifyAuthToken(this.f.code.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]); 
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  
  enterCode(){
    this.tokenAcces= true;
  }
}
