import { environment } from '../../environments/environment.default';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Property } from 'src/interfaces/Property';
import { PropertyRead } from '@angular/compiler';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [AuthenticationService, AngularFireAuth, AngularFirestore],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load the map API successfully', () => {
    const mockResponse = true;
    spyOn(component['http'], 'jsonp').and.returnValue(of(mockResponse));

    fixture.detectChanges();

    expect(component.apiLoaded).toBeTruthy();
  });

  it('should fetch properties successfully', () => {
    const mockResponse: Property[] = getPropertiesMockData();

    component.getProperties();

    const request = httpMock.expectOne(`${environment.apiURL}/properties`);
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);

    expect(component.properties).toEqual(mockResponse);
  });
});

function getPropertiesMockData(): Property[] {
  return [
    {
      propertyId: 42,
      propertyType: 'townhouse',
      address: '5811 American Ash Trail',
      city: 'Paris',
      state: 'Ile de france',
      postalCode: 75000,
      price: '0.0',
      bedrooms: 6,
      bathrooms: 1,
      yearBuilt: 1855,
      latitude: 48.858837,
      longitude: 2.294518,
    },
    {
      propertyId: 320,
      propertyType: 'house',
      address: '12475 Pankratz Pass',
      city: 'Paris',
      state: 'Ile de france',
      postalCode: 75000,
      price: '0.0',
      bedrooms: 7,
      bathrooms: 3,
      yearBuilt: 1844,
      latitude: 48.876366,
      longitude: 2.362022,
    },
    {
      propertyId: 831,
      propertyType: 'townhouse',
      address: '36127 Corben Center',
      city: 'Paris',
      state: 'Ile de france',
      postalCode: 75000,
      price: '0.0',
      bedrooms: 9,
      bathrooms: 3,
      yearBuilt: 1950,
      latitude: 48.852013,
      longitude: 2.326807,
    },
    {
      propertyId: 153,
      propertyType: 'townhouse',
      address: '1936 Park Meadow Drive',
      city: 'Paris',
      state: 'Ile de france',
      postalCode: 75000,
      price: '0.0',
      bedrooms: 6,
      bathrooms: 1,
      yearBuilt: 1948,
      latitude: 48.854626,
      longitude: 2.341992,
    },
    {
      propertyId: 178,
      propertyType: 'apartment',
      address: '86 Dryden Alley',
      city: 'Paris',
      state: 'Ile de france',
      postalCode: 75000,
      price: '0.0',
      bedrooms: 10,
      bathrooms: 3,
      yearBuilt: 1891,
      latitude: 48.855206,
      longitude: 2.355568,
    },
  ];
}
