import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaskingComponent } from './add-masking.component';

describe('AddMaskingComponent', () => {
  let component: AddMaskingComponent;
  let fixture: ComponentFixture<AddMaskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaskingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
