import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwordToUserModalComponent } from './forword-to-user-modal.component';

describe('ForwordToUserModalComponent', () => {
  let component: ForwordToUserModalComponent;
  let fixture: ComponentFixture<ForwordToUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwordToUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwordToUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
