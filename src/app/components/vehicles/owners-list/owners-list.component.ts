import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RouterService } from 'src/app/_services/router.service';
import { VehicleService } from 'src/app/_services/vehicle/vehicle.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit {
  @Input() owners: Array<any>;

  addOwnerForm: FormGroup;
  plate: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  addingOwner = false;

  viewOwners: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.plate = this.route.snapshot.paramMap.get("plate")
    this.addOwnerForm = this.formBuilder.group({
      identity_card: ['', Validators.required],
    });
  }

  onClick() {
    this.viewOwners = !this.viewOwners;
    this.addingOwner = false;
  }

  handlerDelete(owner) {
    this.vehicleService.deleteOwnerOfVehicle(this.plate,owner)
    .pipe(first())
    .subscribe(
      (data) => {
        console.log('Propietario Eliminado Con Exito');
        alert('Propietario Eliminado');
        this.routerService.reload();
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  handlerAddOwner() {
    this.addingOwner = true;
    window.scroll(0, 100);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addOwnerForm.invalid) {
      return;
    }
    this.loading = true;

    this.vehicleService
      .addOwnerToVehicle(this.plate, this.f.identity_card.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Propietario Agregado Con Exito');
          alert('Propietario Agregado');
          this.routerService.reload();
        },
        (error) => {
          console.log(error);
          this.error = error;
          this.loading = false;
        }
      );
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.addOwnerForm.controls;
  }
}
