import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from 'src/interfaces/Property';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
  animations: [
    trigger('openCloseDetail', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @Input() selectedProperty!: Property | null;
  @Output() setPropertyEvent: EventEmitter<Property> =
    new EventEmitter<Property>();

  setNewSelectedProperty(property: Property) {
    this.setPropertyEvent.emit(property);
  }
}
