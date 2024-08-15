import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddUserFormComponent } from './user-group-add-user-form.component';

describe('UserGroupAddUserFormComponent', () => {
  let component: UserGroupAddUserFormComponent;
  let fixture: ComponentFixture<UserGroupAddUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupAddUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupAddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
