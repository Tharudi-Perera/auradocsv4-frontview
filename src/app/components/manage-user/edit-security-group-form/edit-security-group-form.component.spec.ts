import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityGroupFormComponent } from './edit-security-group-form.component';

describe('EditSecurityGroupFormComponent', () => {
  let component: EditSecurityGroupFormComponent;
  let fixture: ComponentFixture<EditSecurityGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSecurityGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecurityGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
