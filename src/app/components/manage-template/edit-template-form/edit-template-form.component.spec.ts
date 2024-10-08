import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTemplateFormComponent } from './edit-template-form.component';

describe('EditTemplateFormComponent', () => {
  let component: EditTemplateFormComponent;
  let fixture: ComponentFixture<EditTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTemplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
