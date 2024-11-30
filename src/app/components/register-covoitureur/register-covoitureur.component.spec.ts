import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCovoitureurComponent } from './register-covoitureur.component';

describe('RegisterCovoitureurComponent', () => {
  let component: RegisterCovoitureurComponent;
  let fixture: ComponentFixture<RegisterCovoitureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCovoitureurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCovoitureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
