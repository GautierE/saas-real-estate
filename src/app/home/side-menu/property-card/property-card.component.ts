import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { environment } from '../../../../environments/environment.default';
import { HttpClient } from '@angular/common/http';
import { Property } from 'src/interfaces/Property';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
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
  editMode: boolean = false;
  propertyForm!: FormGroup;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.propertyForm = this.formBuilder.group({
      address: [{ value: this.property.address, disabled: !this.editMode }],
      postalCode: [
        { value: this.property.postalCode, disabled: !this.editMode },
      ],
      city: [{ value: this.property.city, disabled: !this.editMode }],
      state: [{ value: this.property.state, disabled: !this.editMode }],
      bedrooms: [{ value: this.property.bedrooms, disabled: !this.editMode }],
      bathrooms: [{ value: this.property.bathrooms, disabled: !this.editMode }],
      yearBuilt: [{ value: this.property.yearBuilt, disabled: !this.editMode }],
    });
  }

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

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) this.propertyForm.enable();
    else this.propertyForm.disable();
  }

  saveProperty() {
    if (this.propertyForm.valid) {
      this.editMode = false;

      const updatedProperty: Property = {
        propertyId: this.property.propertyId,
        propertyType: this.property.propertyType,
        address: this.propertyForm.value.address || this.property.address,
        city: this.propertyForm.value.city || this.property.city,
        state: this.propertyForm.value.state || this.property.state,
        postalCode:
          this.propertyForm.value.postalCode || this.property.postalCode,
        price: this.property.price,
        bedrooms: this.propertyForm.value.bedrooms || this.property.bedrooms,
        bathrooms: this.propertyForm.value.bathrooms || this.property.bathrooms,
        yearBuilt: this.propertyForm.value.yearBuilt || this.property.yearBuilt,
        latitude: this.property.latitude,
        longitude: this.property.longitude,
      };

      this.http
        .put<Property>(
          `${environment.apiURL}/property?propertyId=${updatedProperty.propertyId}`,
          updatedProperty
        )
        .subscribe((response) => {
          if (response) {
            console.log('Property updated successfully');
          } else {
            console.error('Error updating property');
          }
        });
    }
  }

  deleteProperty() {
    this.http
      .delete(
        `${environment.apiURL}/property?propertyId=${this.property.propertyId}`
      )
      .subscribe((response) => {
        console.log(response);

        if (response) {
          console.log('Property deleted successfully');
        } else {
          console.error('Error deleting property');
        }
      });
  }
}
