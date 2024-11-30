import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoitureursComponent } from './covoitureurs.component';

describe('CovoitureursComponent', () => {
  let component: CovoitureursComponent;
  let fixture: ComponentFixture<CovoitureursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoitureursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoitureursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
