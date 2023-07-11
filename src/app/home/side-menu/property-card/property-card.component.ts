import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
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
          display: 'flex',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          display: 'none',
        })
      ),
      transition('open => closed', [
        style({ display: 'none' }),
        animate('0.5s'),
      ]),
      transition('closed => open', [
        style({ display: 'flex' }),
        animate('0.5s'),
      ]),
    ]),
  ],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @Input() selectedProperty!: Property | null;
  @Output() setPropertyEvent: EventEmitter<Property> =
    new EventEmitter<Property>();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges() {
    if (
      this.selectedProperty &&
      this.selectedProperty.propertyId === this.property.propertyId
    ) {
      const element = this.el.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setNewSelectedProperty(property: Property) {
    this.setPropertyEvent.emit(property);
  }
}
