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
          transform: 'translateX(-100%)',
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
      transition('open => closed', [animate('3s')]),
      transition('closed => open', [animate('3s')]),
    ]),
  ],
})
export class HomeComponent {
  @ViewChild('googleMap') googleMap!: GoogleMap;
  apiLoaded: Observable<boolean>;
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  isSideMenuOpen = true;
  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/home/map/home-pin.svg',
    },
  };

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
    private http: HttpClient
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
  }

  getProperties() {
    this.http
      .get<Property[]>(`${environment.apiURL}/properties`)
      .subscribe((response) => {
        if (response) {
          this.properties = response;
        } else {
          console.log('Error occurred while fetching properties');
        }
      });
  }

  setSelectedProperty(property: Property) {
    this.selectedProperty = property;
    this.googleMap.panTo({ lat: property.latitude, lng: property.longitude });
  }

  resetSelectedProperty() {
    this.selectedProperty = null;
  }

  logout() {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
}
