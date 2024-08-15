import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwordToUserFormComponent } from './forword-to-user-form.component';

describe('ForwordToUserFormComponent', () => {
  let component: ForwordToUserFormComponent;
  let fixture: ComponentFixture<ForwordToUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwordToUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwordToUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
