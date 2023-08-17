import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapexTimelineComponent } from './capex-timeline.component';

describe('CapexTimelineComponent', () => {
  let component: CapexTimelineComponent;
  let fixture: ComponentFixture<CapexTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapexTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapexTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
