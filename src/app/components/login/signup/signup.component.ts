import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/_models';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { Role } from 'src/app/_models';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/validators/custom-validators';

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
  roles: Array<any> = Object.keys(Role);

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.signUpForm.controls;
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required, 
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8)])
      ],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      identity_card: ['', Validators.required],
    }, {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
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

  changeRole(e) {
    this.f.role.setValue(e.target.value, {
      onlySelf: true
    })
  }
  onSubmit(): void {
    this.submitted = true;

    console.log(this.signUpForm.controls["confirmPassword"].errors)
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;

    const employee: Employee = new Employee();

    employee.fill(this.signUpForm.value)

    console.log(employee)

    this.employeeService
      .signUp(employee)
      .pipe(first())
      .subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Sign Up with succes'
          });
          this.loading = false;
          // window.location.reload();
          // this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error)
          this.error = error;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error[0].msg
          });
          this.loading = false;
        }
      );
  }
}
