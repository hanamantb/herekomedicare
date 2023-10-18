import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPharmaciesPopupComponent } from './no-pharmacies-popup.component';

describe('NoPharmaciesPopupComponent', () => {
  let component: NoPharmaciesPopupComponent;
  let fixture: ComponentFixture<NoPharmaciesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPharmaciesPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPharmaciesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
