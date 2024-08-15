import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaskingFormComponent } from './delete-masking-form.component';

describe('DeleteMaskingFormComponent', () => {
  let component: DeleteMaskingFormComponent;
  let fixture: ComponentFixture<DeleteMaskingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaskingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMaskingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
