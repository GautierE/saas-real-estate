import { Component } from '@angular/core';
import { environment } from '../../environments/environment.default';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  properties: any[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

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
