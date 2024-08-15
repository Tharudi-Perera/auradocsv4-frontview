import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountTemplateTableFormComponent } from './user-account-template-table-form.component';

describe('UserAccountTemplateTableFormComponent', () => {
  let component: UserAccountTemplateTableFormComponent;
  let fixture: ComponentFixture<UserAccountTemplateTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountTemplateTableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountTemplateTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
