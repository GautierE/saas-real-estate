import { Component } from '@angular/core';
import { environment } from '../../environments/environment.default';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Property } from 'src/interfaces/Property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  apiLoaded: Observable<boolean>;
  properties: Property[] = [];
  isSideMenuOpen = true;
  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/map/home-pin.svg',
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

  logout() {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
}
