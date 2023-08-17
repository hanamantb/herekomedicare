import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexBudgetSubmitComponent } from './capex-budget-submit.component';

describe('CapexBudgetSubmitComponent', () => {
  let component: CapexBudgetSubmitComponent;
  let fixture: ComponentFixture<CapexBudgetSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexBudgetSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexBudgetSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
