import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteAndSignComponent } from './add-note-and-sign.component';

describe('AddNoteAndSignComponent', () => {
  let component: AddNoteAndSignComponent;
  let fixture: ComponentFixture<AddNoteAndSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteAndSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteAndSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
