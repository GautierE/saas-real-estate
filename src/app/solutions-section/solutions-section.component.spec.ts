import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsSectionComponent } from './solutions-section.component';

describe('SolutionsSectionComponent', () => {
  let component: SolutionsSectionComponent;
  let fixture: ComponentFixture<SolutionsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionsSectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SolutionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
