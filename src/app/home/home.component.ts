import { Component, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment.default';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Property } from 'src/interfaces/Property';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { GoogleMap } from '@angular/google-maps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('openCloseSideMenu', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: `translateX(${getTranslateXPercentage()})`,
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
    trigger('rotateChevron', [
      state(
        'open',
        style({
          transform: 'rotate(90deg)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
    trigger('openCloseCreateProperty', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('open => closed', [animate('0.4s')]),
      transition('closed => open', [animate('0.4s')]),
    ]),
  ],
})
export class HomeComponent {
  @ViewChild('googleMap') googleMap!: GoogleMap;
  apiLoaded: Observable<boolean>;
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  isSideMenuOpen = true;
  isCreateMenuOpen = false;
  newPropertyLocation: google.maps.LatLng | null = null;
  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/home/map/home-pin.svg',
    },
  };
  propertyForm!: FormGroup;

  googleMapsOptions: google.maps.MapOptions = {
    // Paris center coordinates
    center: { lat: 48.8566, lng: 2.3522 },
    zoom: 13,
    fullscreenControl: false,
    streetViewControl: false,
    disableDefaultUI: true,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.apiLoaded = http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.mapsApiKey}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit() {
    this.authenticationService.signedInCheck().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.getProperties();
      }
    });
    this.propertyForm = this.formBuilder.group({
      propertyType: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      price: ['', [Validators.required]],
      bedrooms: ['', [Validators.required]],
      bathrooms: ['', [Validators.required]],
      yearBuilt: ['', [Validators.required]],
    });
  }

  getProperties() {
    this.http.get<Property[]>(`${environment.apiURL}/properties`).subscribe({
      next: (response) => {
        this.properties = response;
      },
      error: (error: any) => {
        console.error('Error occurred while fetching properties');
        this.snackBar.open(error.message, 'OK', {
          duration: 2000,
        });
      },
    });
  }

  createProperty() {
    if (this.propertyForm.valid && this.newPropertyLocation) {
      this.isCreateMenuOpen = false;

      const newProperty: Property = {
        propertyId: this.generateRandomUniqueId(),
        propertyType: this.propertyForm.value.propertyType,
        address: this.propertyForm.value.address,
        city: this.propertyForm.value.city,
        state: this.propertyForm.value.state,
        postalCode: this.propertyForm.value.postalCode,
        price: this.propertyForm.value.price,
        bedrooms: this.propertyForm.value.bedrooms,
        bathrooms: this.propertyForm.value.bathrooms,
        yearBuilt: this.propertyForm.value.yearBuilt,
        latitude: this.newPropertyLocation?.lat(),
        longitude: this.newPropertyLocation?.lng(),
      };

      this.http
        .post<Property>(`${environment.apiURL}/property`, newProperty)
        .subscribe({
          next: (response) => {
            this.properties.push(newProperty);
            this.propertyForm.reset();
            this.snackBar.open('Property created successfully', 'OK', {
              duration: 2000,
            });
          },
          error: (error: any) => {
            this.snackBar.open(error.message, 'OK', {
              duration: 2000,
            });
          },
        });
    }
  }

  deleteProperty(propertyId: number) {
    this.http
      .delete(`${environment.apiURL}/property?propertyId=${propertyId}`)
      .subscribe({
        next: (response) => {
          this.properties = this.properties.filter(
            (property) => property.propertyId !== propertyId
          );
          this.snackBar.open('Property deleted successfully', 'OK', {
            duration: 2000,
          });
        },
        error: (error: any) => {
          this.snackBar.open(error.message, 'OK', {
            duration: 2000,
          });
        },
      });
  }

  handleMapClick(event: google.maps.MapMouseEvent) {
    if (this.selectedProperty) {
      this.resetSelectedProperty();
    } else {
      this.isCreateMenuOpen = true;
      this.newPropertyLocation = event.latLng;
    }
  }

  handleMarkerClick(property: Property) {
    this.setSelectedProperty(property);
    this.isSideMenuOpen = true;
  }

  logout() {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  setSelectedProperty(property: Property) {
    this.selectedProperty = property;
    this.googleMap.panTo({ lat: property.latitude, lng: property.longitude });
  }

  resetSelectedProperty() {
    this.selectedProperty = null;
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeCreateMenu() {
    this.isCreateMenuOpen = false;
    this.propertyForm.reset();
  }

  generateRandomUniqueId(): number {
    let randomId: number = 0;
    let isUnique = false;

    while (!isUnique) {
      randomId = Math.floor(Math.random() * 1000000) + 1;

      // Check if the generated ID already exists in the properties array
      isUnique = !this.properties.some(
        (property) => property.propertyId === randomId
      );
    }

    return randomId;
  }
}

function getTranslateXPercentage(): String {
  let translatePercentage: String = '0';
  const screenWidth: number = window.innerWidth;

  if (screenWidth >= 1100) {
    translatePercentage = '-18%';
  } else if (screenWidth >= 1024) {
    translatePercentage = '-23%';
  } else if (screenWidth >= 768) {
    translatePercentage = '-34%';
  } else {
    translatePercentage = '-68%';
  }

  return translatePercentage;
}
