import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexBudgetPendingComponent } from './capex-budget-pending.component';

describe('CapexBudgetPendingComponent', () => {
  let component: CapexBudgetPendingComponent;
  let fixture: ComponentFixture<CapexBudgetPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexBudgetPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexBudgetPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
