import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSelectorComponent } from './signup-selector.component';

describe('SignupSelectorComponent', () => {
  let component: SignupSelectorComponent;
  let fixture: ComponentFixture<SignupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
