import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  isLoggingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService
      .signIn({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (error: any) => {
          this.isLoggingIn = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 3000,
          });
        }
      );
  }
}
