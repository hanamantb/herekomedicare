import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantMpngComponent } from './user-plant-mpng.component';

describe('UserPlantMpngComponent', () => {
  let component: UserPlantMpngComponent;
  let fixture: ComponentFixture<UserPlantMpngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantMpngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlantMpngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
