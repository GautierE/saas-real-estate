import { Component, Input } from '@angular/core';
import { Property } from 'src/interfaces/Property';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() properties!: Property[];
}
