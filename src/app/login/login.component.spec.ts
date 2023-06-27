import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let page: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('when email is empty, recover password button should be disabled', () => {
    setEmail('');
    expect(recoverPasswordButton().disabled).toBeTruthy();
  });

  it('when email is invalid, recover password button should be disabled', () => {
    setEmail('invalidEmail');
    expect(recoverPasswordButton().disabled).toBeTruthy();
  });

  it('when email is valid, recover password button should be disabled', () => {
    setEmail('test@email.com');
    expect(recoverPasswordButton().disabled).toBeFalsy();
  });

  it('when email is empty, login button should be disabled', () => {
    setEmail('');
    setPassword('anyPassword');
    expect(loginButton().disabled).toBeTruthy();
  });

  it('when email is invalid, login button should be disabled', () => {
    setEmail('invalidEmail');
    setPassword('anyPassword');
    expect(loginButton().disabled).toBeTruthy();
  });

  it('when password is empty, login button should be disabled', () => {
    setEmail('test@email.com');
    setPassword('');
    expect(loginButton().disabled).toBeTruthy();
  });

  it('when password is not empty, login button should be enabled', () => {
    setEmail('test@email.com');
    setPassword('anyPassword');
    expect(loginButton().disabled).toBeFalsy();
  });

  function setEmail(email: string) {
    component.form.get('email')?.setValue(email);
    fixture.detectChanges();
  }

  function setPassword(password: string) {
    component.form.get('password')?.setValue(password);
    fixture.detectChanges();
  }

  function recoverPasswordButton() {
    return page.querySelector('[test-id="recover-password-button"]');
  }

  function loginButton() {
    return page.querySelector('[test-id="login-button"]');
  }
});
