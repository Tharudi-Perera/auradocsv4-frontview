import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTemplateFormComponent } from './new-template-form.component';

describe('NewTemplateFormComponent', () => {
  let component: NewTemplateFormComponent;
  let fixture: ComponentFixture<NewTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTemplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
