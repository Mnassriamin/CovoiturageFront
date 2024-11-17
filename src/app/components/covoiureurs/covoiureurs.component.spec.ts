import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiureursComponent } from './covoiureurs.component';

describe('CovoiureursComponent', () => {
  let component: CovoiureursComponent;
  let fixture: ComponentFixture<CovoiureursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoiureursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiureursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
