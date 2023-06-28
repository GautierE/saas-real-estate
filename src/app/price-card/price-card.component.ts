import { Component, Input } from '@angular/core';
import { PriceCardInterface } from '../interfaces/PriceCardInterface';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
})
export class PriceCardComponent {
  @Input() cardData!: PriceCardInterface;
}
