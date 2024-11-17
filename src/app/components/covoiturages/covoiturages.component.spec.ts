import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesComponent } from './covoiturages.component';

describe('CovoituragesComponent', () => {
  let component: CovoituragesComponent;
  let fixture: ComponentFixture<CovoituragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoituragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoituragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
