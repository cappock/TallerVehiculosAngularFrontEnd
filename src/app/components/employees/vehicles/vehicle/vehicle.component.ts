import {Component, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Vehicle} from 'src/app/_models';
import {VehicleService} from 'src/app/_services/vehicle/vehicle.service';

import {RouterService} from 'src/app/_services/router.service';
import {faBan, faEdit, faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  faSave = faSave;
  faEdit = faEdit;
  faBan = faBan;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  vehicle: Vehicle = new Vehicle();

  editing = false;

  adding = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private routerService: RouterService
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.vehicleForm.controls;
  }

  ngOnInit(): void {
    this.vehicle.plate = this.route.snapshot.paramMap.get('plate');

    this.vehicleForm = this.formBuilder.group({
      plate: [this.vehicle.plate, Validators.required],
      brand: [this.vehicle.brand, Validators.required],
      model: [this.vehicle.model, Validators.required],
      color: [this.vehicle.color, Validators.required],
      vehicle_type: [this.vehicle.vehicle_type, Validators.required],
    });

    if (this.vehicle.plate) {
      this.adding = false;
      this.vehicleService.getVehicle(this.vehicle.plate).subscribe((data) => {
          this.vehicle.fill(data);
          this.vehicleForm = this.formBuilder.group({
            plate: [this.vehicle.plate, Validators.required],
            brand: [this.vehicle.brand, Validators.required],
            model: [this.vehicle.model, Validators.required],
            color: [this.vehicle.color, Validators.required],
            vehicle_type: [this.vehicle.vehicle_type, Validators.required],
          });
        },
        (error: any) => {
          this.routerService.redirectEmployees(`vehicle`);
          alert('Vehicle Not Found');
        });
    }
    this.vehicleForm.disable();
    if (this.adding === true) {
      this.vehicleForm.enable();
      this.editing = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.vehicleForm.invalid) {
      return;
    }
    this.loading = true;

    this.vehicle.fill(this.vehicleForm.value);
    if (this.adding === true) {
      this.vehicleService
        .create(this.vehicle)
        .pipe(first())
        .subscribe(
          (data) => {
            alert('Created with success');
            this.routerService.redirectEmployees(`vehicle/${this.vehicle.plate}`);
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.error = error;
            this.loading = false;
          }
        );
      return;
    }
    this.vehicleService
      .update(this.vehicle)
      .pipe(first())
      .subscribe(
        (data) => {
          alert('Update with success');
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.error = error;
          this.loading = false;
        }
      );
  }

  onEdit(): void {
    this.editing = true;
    this.vehicleForm.enable();
    this.f.plate.disable();
  }

  onCancel(): void {
    this.vehicleForm.reset(this.vehicle);
    if (!this.adding) {
      this.editing = false;
      this.vehicleForm.disable();
    }
  }
}
