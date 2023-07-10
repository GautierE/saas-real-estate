import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  scrollDistance: number = 0;
  isNavbarHidden: boolean = false;

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const scrollThreshold = 200;

    if (scrollPosition > this.scrollDistance) {
      this.scrollDistance = scrollPosition;
      this.isNavbarHidden = scrollPosition > scrollThreshold;
    } else {
      this.scrollDistance = scrollPosition;
      this.isNavbarHidden = false;
    }
  }

  logout() {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
