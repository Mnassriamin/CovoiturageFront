import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConducteurComponent } from './register-conducteur.component';

describe('RegisterConducteurComponent', () => {
  let component: RegisterConducteurComponent;
  let fixture: ComponentFixture<RegisterConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterConducteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
