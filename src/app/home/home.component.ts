import { Component } from '@angular/core';
import { environment } from '../../environments/environment.default';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  apiLoaded: Observable<boolean>;
  properties: any[] = [];

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
        map(() => {
          console.log('loaded');
          return true;
        }),
        catchError((e) => {
          console.log(e);
          return of(false);
        })
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
      .get<any[]>(`${environment.apiURL}/properties`)
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
}
