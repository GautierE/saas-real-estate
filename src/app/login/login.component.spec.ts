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
    });
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('when email is empty, recover password button should be disabled', () => {
    component.form.get('email')?.setValue('');
    expect(
      page.querySelector('[test-id="recover-password-button"]').disabled
    ).toBeTruthy();
  });

  it('when email is invalid, recover password button should be disabled', () => {
    component.form.get('email')?.setValue('invalidEmail');
    fixture.detectChanges();
    expect(
      page.querySelector('[test-id="recover-password-button"]').disabled
    ).toBeTruthy();
  });

  it('when email is valid, recover password button should be disabled', () => {
    component.form.get('email')?.setValue('test@email.com');
    fixture.detectChanges();
    expect(
      page.querySelector('[test-id="recover-password-button"]').disabled
    ).toBeFalsy();
  });
});
