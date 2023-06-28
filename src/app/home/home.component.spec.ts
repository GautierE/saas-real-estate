// import { HomeComponent } from './home.component';
// import { Location } from '@angular/common';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { BehaviorSubject } from 'rxjs';
// import { BlankComponent } from '../mocks/blank/blank.component';
// import { AuthenticationService } from '../../services/authentication.service';

// describe('LoginComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let page: any;
//   let location: Location;
//   let authenticationService: AuthenticationServiceMock;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HomeComponent],
//       imports: [
//         ReactiveFormsModule,
//         RouterTestingModule.withRoutes([
//           { path: 'login', component: BlankComponent },
//         ]),
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     }).overrideProvider(AuthenticationService, {
//       useValue: authenticationService,
//     });

//     fixture = TestBed.createComponent(HomeComponent);
//     location = TestBed.inject(Location);

//     component = fixture.componentInstance;
//     page = fixture.debugElement.nativeElement;

//     fixture.detectChanges();
//   });
// });

// class AuthenticationServiceMock {
//   private _authStateResponse = new BehaviorSubject(null);

//   get authState() {
//     return this._authStateResponse.asObservable();
//   }

//   setAuthState(authState: any) {
//     this._authStateResponse.next(authState);
//   }

//   logout() {
//     // return this._signInResponse.asObservable();
//   }
// }
