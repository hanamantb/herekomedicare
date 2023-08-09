import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsCoveredDialogboxComponent } from './drugs-covered-dialogbox.component';

describe('DrugsCoveredDialogboxComponent', () => {
  let component: DrugsCoveredDialogboxComponent;
  let fixture: ComponentFixture<DrugsCoveredDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsCoveredDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsCoveredDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
