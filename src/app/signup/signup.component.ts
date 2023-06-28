import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form!: FormGroup;
  isSigningUp = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
    this.authenticationService
      .signUp({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe(
        () => {
          this.router.navigate(['/login']);
          this.snackBar.open('Compte créé avec succès', 'OK', {
            duration: 3000,
          });
        },
        (error: any) => {
          this.isSigningUp = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 3000,
          });
        }
      );
  }
}
