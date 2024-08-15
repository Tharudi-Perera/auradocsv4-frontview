import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountTemplateTableModalComponent } from './user-account-template-table-modal.component';

describe('UserAccountTemplateTableModalComponent', () => {
  let component: UserAccountTemplateTableModalComponent;
  let fixture: ComponentFixture<UserAccountTemplateTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountTemplateTableModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountTemplateTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
