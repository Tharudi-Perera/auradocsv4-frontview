import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateSecurityGroupFormComponent } from './deactivate-security-group-form.component';

describe('DeactivateSecurityGroupFormComponent', () => {
  let component: DeactivateSecurityGroupFormComponent;
  let fixture: ComponentFixture<DeactivateSecurityGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateSecurityGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateSecurityGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
