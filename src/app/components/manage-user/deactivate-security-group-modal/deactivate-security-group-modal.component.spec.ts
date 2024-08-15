import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateSecurityGroupModalComponent } from './deactivate-security-group-modal.component';

describe('DeactivateSecurityGroupModalComponent', () => {
  let component: DeactivateSecurityGroupModalComponent;
  let fixture: ComponentFixture<DeactivateSecurityGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateSecurityGroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateSecurityGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
