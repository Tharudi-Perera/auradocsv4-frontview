import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAccountModalComponent } from './edit-user-account-modal.component';

describe('EditUserAccountModalComponent', () => {
  let component: EditUserAccountModalComponent;
  let fixture: ComponentFixture<EditUserAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserAccountModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
