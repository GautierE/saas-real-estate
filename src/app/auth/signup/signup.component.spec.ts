import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { BlankComponent } from '../../mocks/blank/blank.component';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let page: any;
  let location: Location;
  let authenticationService: AuthenticationServiceMock;
  let snackBar: SnackBarMock;

  beforeEach(() => {
    authenticationService = new AuthenticationServiceMock();
    snackBar = new SnackBarMock();

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: BlankComponent },
        ]),
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideProvider(AuthenticationService, {
        useValue: authenticationService,
      })
      .overrideProvider(MatSnackBar, {
        useValue: snackBar,
      });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    page = fixture.debugElement.nativeElement;

    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form requirements', () => {
    beforeEach(() => {
      setFirstName('FirstName');
      setLastName('LastName');
      setEmail('test@email.com');
      setPhone('0698675234');
      setProfession('Agency manager');
      setEmployeesCount('1 - 5');
      setPassword('1234556');
      setTosAgreed(true);
    });

    it('when first name is empty, signup button should be disabled', () => {
      setFirstName('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when last name is empty, signup button should be disabled', () => {
      setLastName('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when email is empty, signup button should be disabled', () => {
      setEmail('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when email is invalid, signup button should be disabled', () => {
      setEmail('test@adza/com');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when phone is empty, signup button should be disabled', () => {
      setPhone('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when profession is empty, signup button should be disabled', () => {
      setEmployeesCount('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when employees count is empty, signup button should be disabled', () => {
      setProfession('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when password is empty, signup button should be disabled', () => {
      setPassword('');
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when tos checkbox is not checked, signup button should be disabled', () => {
      setTosAgreed(false);
      expect(signUpButton().disabled).toBeTruthy();
    });

    it('when all fields are field and tos checkbox is checked, signup button should be enabled', () => {
      expect(signUpButton().disabled).toBeFalsy();
    });
  });

  describe('Signup flow', () => {
    describe('When user click on signup button', () => {
      beforeEach(() => {
        setFirstName('FirstName');
        setLastName('LastName');
        setEmail('test@email.com');
        setPhone('0698675234');
        setProfession('Agency manager');
        setEmployeesCount('1 - 5');
        setPassword('1234556');
        setTosAgreed(true);
        signUpButton().click();
        fixture.detectChanges();
      });

      it('Signup loader is displayed', () => {
        expect(signUpLoader()).not.toBeNull();
      });

      it('Signup button is hidden', () => {
        expect(signUpButton()).toBeNull();
      });

      describe('When Signup fails', () => {
        beforeEach(() => {
          authenticationService._signUpResponse.error({
            message: 'signUpError',
          });
          fixture.detectChanges();
        });

        it('Do not go to login app page', (done) => {
          setTimeout(() => {
            expect(location.path()).not.toEqual('/login');
            done();
          }, 100);
        });

        it('Hide sign up loader', () => {
          expect(signUpLoader()).toBeNull();
        });

        it('Show sign up button', () => {
          expect(signUpButton()).not.toBeNull();
        });

        it('Show error message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });

      describe('When signup is successful', () => {
        beforeEach(() => {
          authenticationService._signUpResponse.next({});
          fixture.detectChanges();
        });

        it('go to login app page', (done) => {
          setTimeout(() => {
            expect(location.path()).toEqual('/login');
            done();
          }, 100);
        });

        it('Show success message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });
    });
  });

  function setFirstName(firstName: string) {
    component.form.get('firstName')?.setValue(firstName);
    fixture.detectChanges();
  }

  function setLastName(lastName: string) {
    component.form.get('lastName')?.setValue(lastName);
    fixture.detectChanges();
  }

  function setEmail(email: string) {
    component.form.get('email')?.setValue(email);
    fixture.detectChanges();
  }

  function setPhone(phone: string) {
    component.form.get('phone')?.setValue(phone);
    fixture.detectChanges();
  }

  function setProfession(profession: string) {
    component.form.get('profession')?.setValue(profession);
    fixture.detectChanges();
  }

  function setEmployeesCount(employeesCount: string) {
    component.form.get('employeesCount')?.setValue(employeesCount);
    fixture.detectChanges();
  }

  function setPassword(password: string) {
    component.form.get('password')?.setValue(password);
    fixture.detectChanges();
  }

  function setTosAgreed(tosAgreed: boolean) {
    component.form.get('tosAgreed')?.setValue(tosAgreed);
    fixture.detectChanges();
  }

  function signUpButton() {
    return page.querySelector('[test-id="signup-button"]');
  }

  function signUpLoader() {
    return page.querySelector('[test-id="signup-loader"]');
  }
});

class AuthenticationServiceMock {
  _signUpResponse = new Subject();
  _signedInCheckResponse = new Subject();

  signedInCheck() {
    return this._signedInCheckResponse.asObservable();
  }

  signUp() {
    return this._signUpResponse.asObservable();
  }
}

class SnackBarMock {
  _isOpened = false;
  open() {
    this._isOpened = true;
  }
}
