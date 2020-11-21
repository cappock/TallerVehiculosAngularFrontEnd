import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Owner } from 'src/app/_models';
import { OwnerService } from 'src/app/_services/owner/owner.service';
import { RouterService } from 'src/app/_services/router.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  ownerForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  owner: Owner = new Owner;

  editing = false;
  adding = true;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.owner.identity_card = this.route.snapshot.paramMap.get("identity_card")

    if(this.owner.identity_card){
      this.adding = false;
      this.ownerService.getOwner(this.owner.identity_card).subscribe(data =>{
        this.owner.fill(data);
        this.ownerForm = this.formBuilder.group({
          identity_card: [this.owner.identity_card, Validators.required],
          names: [this.owner.names, Validators.required],
          surnames: [this.owner.surnames, Validators.required],
          phone: [this.owner.phone, Validators.required],
          email: [this.owner.email, Validators.required]
        });
      }, 
      (error : any) => {
        this.routerService.redirectEmployees(`owner`);        
        alert('Owner not Found');
      });
    }
    this.ownerForm = this.formBuilder.group({
      identity_card: [this.owner.identity_card, Validators.required],
      names: [this.owner.names, Validators.required],
      surnames: [this.owner.surnames, Validators.required],
      phone: [this.owner.phone, Validators.required],
      email: [this.owner.email, Validators.required]
    });

    this.ownerForm.disable();
    if(this.adding === true){
      this.ownerForm.enable();
      this.editing = true;
    }  
  }


  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.ownerForm.invalid) {
      return;
    }
    this.loading = true;

    this.owner.fill(this.ownerForm.value);
    if(this.adding === true){
        this.ownerService.create(this.owner)
      .pipe(first())
      .subscribe(data => {
          alert('Created with success');
          this.routerService.redirectEmployees(`owner/${this.owner.identity_card}`)
          this.loading = false;
        },
        (error) => {
          console.log(error)
          this.error = error;
          this.loading = false;
      });    
      return;
    }
    this.ownerService.update(this.owner)
    .pipe(first())
    .subscribe(data => {
        alert('Update with success');        
        this.loading = false;
      },
      (error) => {
        console.log(error)
        this.error = error;
        this.loading = false;
    });
  }

  onEdit(): void {
    this.editing = true;
    this.ownerForm.enable();    
    this.f.identity_card.disable()
  }

  onCancel(): void {
    this.ownerForm.reset(this.owner);
    if(!this.adding){
      this.editing = false;
      this.ownerForm.disable();
    }
  }
  get f(): any {
    return this.ownerForm.controls;
  }
}
