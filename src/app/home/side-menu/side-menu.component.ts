import { Component, Input } from '@angular/core';
import { Property } from 'src/interfaces/Property';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  @Input() properties!: Property[];
}
