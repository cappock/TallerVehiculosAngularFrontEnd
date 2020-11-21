import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Employee} from 'src/app/_models';
import {EmployeeService} from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.signUpForm.controls;
  }

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
  }

  getUser(): void {
    this.employeeService.getMe().subscribe((data) => {
      console.log(data);
    });
  }

  onReset() {
    this.signUpForm.reset();
    }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;

    const employee: Employee = new Employee();

    employee.fill(this.signUpForm.value)


    this.employeeService
      .signUp(employee)
      .pipe(first())
      .subscribe(
        (data) => {
          alert('Sign Up with succes');
          this.loading = false;
          // window.location.reload();
          // this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error)
          this.error = error;
          this.loading = false;
        }
      );
  }
}
