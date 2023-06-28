import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { BlankComponent } from '../../mocks/blank/blank.component';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../../services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let page: any;
  let location: Location;
  let authenticationService: AuthenticationServiceMock;
  let snackBar: SnackBarMock;

  beforeEach(() => {
    authenticationService = new AuthenticationServiceMock();
    snackBar = new SnackBarMock();

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: BlankComponent },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideProvider(AuthenticationService, {
        useValue: authenticationService,
      })
      .overrideProvider(MatSnackBar, {
        useValue: snackBar,
      });

    fixture = TestBed.createComponent(LoginComponent);
    location = TestBed.inject(Location);

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

  it('when email is valid, recover password button should be enabled', () => {
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

  describe('Login flow', () => {
    describe('When user click on login button', () => {
      beforeEach(() => {
        setEmail('test@email.com');
        setPassword('anyPassword');
        loginButton().click();
        fixture.detectChanges();
      });

      it('Login loader is displayed', () => {
        expect(loginLoader()).not.toBeNull();
      });

      it('Login button is hidden', () => {
        expect(loginButton()).toBeNull();
      });

      describe('When login fails', () => {
        beforeEach(() => {
          authenticationService._signInResponse.error({
            message: 'loginError',
          });
          fixture.detectChanges();
        });

        it('Do not go to home app page', (done) => {
          setTimeout(() => {
            expect(location.path()).not.toEqual('/home');
            done();
          }, 100);
        });

        it('Hide login loader', () => {
          expect(loginLoader()).toBeNull();
        });

        it('Show login button', () => {
          expect(loginButton()).not.toBeNull();
        });

        it('Show error message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });

      describe('When login is successful', () => {
        beforeEach(() => {
          authenticationService._signInResponse.next({});
          fixture.detectChanges();
        });

        it('go to home app page', (done) => {
          setTimeout(() => {
            expect(location.path()).toEqual('/home');
            done();
          }, 100);
        });

        it('Show success message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });
    });
  });

  describe('Recover password flow', () => {
    describe('User clicks on recover password button', () => {
      beforeEach(() => {
        setEmail('any@email.com');
        recoverPasswordButton().click();
        fixture.detectChanges();
      });

      it('Show recover loader', () => {
        expect(recoverPasswordLoader()).not.toBeNull();
      });

      it('Hide recover password button', () => {
        expect(recoverPasswordButton()).toBeNull();
      });

      describe('Recover fails', () => {
        beforeEach(() => {
          authenticationService._recoverPasswordResponse.error({
            message: 'Recover error',
          });
          fixture.detectChanges();
        });

        it('Hide recover loader', () => {
          expect(recoverPasswordLoader()).toBeNull();
        });

        it('Show recover password button', () => {
          expect(recoverPasswordButton()).not.toBeNull();
        });

        it('Show error message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });

      describe('Recover success', () => {
        beforeEach(() => {
          authenticationService._recoverPasswordResponse.next({});
          fixture.detectChanges();
        });

        it('Hide recover loader', () => {
          expect(recoverPasswordLoader()).toBeNull();
        });

        it('Show recover password button', () => {
          expect(recoverPasswordButton()).not.toBeNull();
        });

        it('Show success message', () => {
          expect(snackBar._isOpened).toBeTruthy();
        });
      });
    });
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

  function recoverPasswordLoader() {
    return page.querySelector('[test-id="recover-password-loader"]');
  }

  function loginButton() {
    return page.querySelector('[test-id="login-button"]');
  }

  function loginLoader() {
    return page.querySelector('[test-id="login-loader"]');
  }
});

class AuthenticationServiceMock {
  _signInResponse = new Subject();
  _recoverPasswordResponse = new Subject();
  _signedInCheckResponse = new Subject();

  signedInCheck() {
    return this._signedInCheckResponse.asObservable();
  }

  signIn() {
    return this._signInResponse.asObservable();
  }

  recoverPassword() {
    return this._recoverPasswordResponse.asObservable();
  }
}

class SnackBarMock {
  _isOpened = false;
  open() {
    this._isOpened = true;
  }
}
