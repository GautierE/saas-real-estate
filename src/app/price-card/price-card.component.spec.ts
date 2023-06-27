import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCardComponent } from './price-card.component';

describe('PriceCardComponent', () => {
  let component: PriceCardComponent;
  let fixture: ComponentFixture<PriceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceCardComponent],
    });
    fixture = TestBed.createComponent(PriceCardComponent);
    component = fixture.componentInstance;
    component.cardData = {
      logoPath: 'assets/solutions-section/solutions-cards/api-logo-color.svg',
      title: 'API',
      paragraph:
        "Destinée à tout type d'acteur ayant des besoins en données immobilières, notre API est la solution idéale pour associer votre expertise à nos données.",
      items: [
        'Développeur',
        'Data Scientist',
        'Responsable digital',
        'Responsable des données',
        "Directeur des systèmes d'informations",
      ],
      color: 'api',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
