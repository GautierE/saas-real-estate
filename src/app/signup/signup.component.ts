import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form!: FormGroup;
  isSigningUp = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      employeesCount: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tosAgreed: [false, [Validators.required]],
    });
  }

  signUp() {
    this.isSigningUp = true;
  }
}
