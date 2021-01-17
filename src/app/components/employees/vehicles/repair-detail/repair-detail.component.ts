import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faBan, faEdit, faSave, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { first, throwIfEmpty } from 'rxjs/operators';
import { RepairDetail } from 'src/app/_models/repair-detail';
import { RouterService } from 'src/app/_services/router.service';
import { RepairDetailService } from 'src/app/_services/vehicle/repair-detail.service';


@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  repairForm: FormGroup;
  faSave = faSave;
  faEdit = faEdit;
  faBan = faBan;
  faPlusCircle = faPlusCircle;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  repair: RepairDetail = new RepairDetail();

  editing = false;

  adding = true;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private repairService: RepairDetailService,
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.repair.vehicle_id = this.route.snapshot.paramMap.get('plate');
    this.repair.id = Number(this.route.snapshot.paramMap.get('repair_id'));

    this.repairForm = this.formBuilder.group({
      vehicle_id: [this.repair.vehicle_id, Validators.required],
      description: ["", Validators.required],
      cost: [this.repair.cost, Validators.required],
      spare_parts: [[]],
      state: ["", Validators.required],
      id: [this.repair.id],
      spare_part: [""]
    });

    if (this.repair.vehicle_id && this.repair.id) {
      this.adding = false;
      this.repairService.getRepairDetail(this.repair.vehicle_id,this.repair.id).subscribe((data) => {
          this.repair = data;
          this.repairForm = this.formBuilder.group({
            vehicle_id: [this.repair.vehicle_id, Validators.required],
            description: [this.repair.description, Validators.required],
            cost: [this.repair.cost, Validators.required],
            spare_parts: [this.repair.spare_parts, Validators.required],
            state: [this.repair.state, Validators.required],
            id: [this.repair.id],
            spare_part: []
          });
        },
        (error: any) => {
          this.routerService.redirectEmployees(`vehicles`);
          alert('Repair Detail Not Found');
        });
    }
    this.repairForm.disable();
    if (this.adding === true) {
      this.repairForm.enable();
      this.editing = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.repairForm.invalid) {
      console.log(this.repairForm);
      return;
    }
    this.loading = true;
    this.repair.fill(this.repairForm.value);
    if (this.adding === true) {
      this.repairService
        .create(this.repair.vehicle_id, this.repair)
        .pipe(first())
        .subscribe(
          (data) => {
            alert('Created with success');
            this.routerService.redirectEmployees(`vehicle/${this.repair.vehicle_id}`);
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
    this.repairService
      .update(this.repair.vehicle_id, this.repair)
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
    this.repairForm.enable();
    this.f.plate.disable();
  }

  onCancel(): void {
    this.repairForm.reset(this.repair);
    if (!this.adding) {
      this.editing = false;
      this.repairForm.disable();
    }
  }

  onAddPart(){
    this.f.spare_parts.value.push(this.f.spare_part.value);
    this.f.spare_part.reset();
  }

  get f(): any {
    return this.repairForm.controls;
  }

}
