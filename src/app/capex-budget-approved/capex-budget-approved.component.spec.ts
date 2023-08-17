import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexBudgetApprovedComponent } from './capex-budget-approved.component';

describe('CapexBudgetApprovedComponent', () => {
  let component: CapexBudgetApprovedComponent;
  let fixture: ComponentFixture<CapexBudgetApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexBudgetApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexBudgetApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
