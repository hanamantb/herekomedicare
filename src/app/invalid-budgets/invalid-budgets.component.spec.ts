import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidBudgetsComponent } from './invalid-budgets.component';

describe('InvalidBudgetsComponent', () => {
  let component: InvalidBudgetsComponent;
  let fixture: ComponentFixture<InvalidBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidBudgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
