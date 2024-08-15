import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAccountFormComponent } from './edit-user-account-form.component';

describe('EditUserAccountFormComponent', () => {
  let component: EditUserAccountFormComponent;
  let fixture: ComponentFixture<EditUserAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserAccountFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
