import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsCardsComponent } from './solutions-cards.component';

describe('SolutionsCardComponent', () => {
  let component: SolutionsCardsComponent;
  let fixture: ComponentFixture<SolutionsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionsCardsComponent],
    });
    fixture = TestBed.createComponent(SolutionsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
