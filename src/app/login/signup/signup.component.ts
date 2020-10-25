import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/_models';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  employee: Employee = new Employee();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      identity_card: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }

  getUser() {
    this.employeeService.getMe().subscribe((data) => {
      console.log(data);
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.f);

    let employee: Employee = new Employee();

    employee.identity_card = this.f.identity_card.value;
    employee.email = this.f.email.value;
    employee.surnames = this.f.surnames.value;
    employee.names = this.f.names.value;
    employee.username = this.f.username.value;
    employee.phone = this.f.phone.value;
    employee.role = this.f.role.value;

    this.employeeService
      .signUp(employee)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log("INGRESADO")
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
