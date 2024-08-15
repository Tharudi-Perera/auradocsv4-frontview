import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaskingFormComponent } from './new-masking-form.component';

describe('NewMaskingFormComponent', () => {
  let component: NewMaskingFormComponent;
  let fixture: ComponentFixture<NewMaskingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMaskingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMaskingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
