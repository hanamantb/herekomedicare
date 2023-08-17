import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoPushpageComponent } from './cfo-pushpage.component';

describe('CfoPushpageComponent', () => {
  let component: CfoPushpageComponent;
  let fixture: ComponentFixture<CfoPushpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoPushpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfoPushpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
