import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  scrollDistance: number = 0;
  isNavbarHidden: boolean = false;

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
}
