import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTemplateModalComponent } from './edit-template-modal.component';

describe('EditTemplateModalComponent', () => {
  let component: EditTemplateModalComponent;
  let fixture: ComponentFixture<EditTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTemplateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
