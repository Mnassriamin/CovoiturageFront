import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetDetailsComponent } from './trajet-details.component';

describe('TrajetDetailsComponent', () => {
  let component: TrajetDetailsComponent;
  let fixture: ComponentFixture<TrajetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrajetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrajetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
