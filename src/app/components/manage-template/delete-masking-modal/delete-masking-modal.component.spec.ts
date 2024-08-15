import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaskingModalComponent } from './delete-masking-modal.component';

describe('DeleteMaskingModalComponent', () => {
  let component: DeleteMaskingModalComponent;
  let fixture: ComponentFixture<DeleteMaskingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaskingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMaskingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
