import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from 'src/interfaces/Property';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() properties!: Property[];
  @Input() selectedProperty!: Property | null;
  @Output() setPropertyEvent: EventEmitter<Property> =
    new EventEmitter<Property>();

  setNewSelectedProperty(property: Property) {
    this.setPropertyEvent.emit(property);
  }
}
