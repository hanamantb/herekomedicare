import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminpushComponent } from './superadminpush.component';

describe('SuperadminpushComponent', () => {
  let component: SuperadminpushComponent;
  let fixture: ComponentFixture<SuperadminpushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminpushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminpushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
