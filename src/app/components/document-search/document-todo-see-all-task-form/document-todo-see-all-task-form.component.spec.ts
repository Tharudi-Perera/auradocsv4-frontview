import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTodoSeeAllTaskFormComponent } from './document-todo-see-all-task-form.component';

describe('DocumentTodoSeeAllTaskFormComponent', () => {
  let component: DocumentTodoSeeAllTaskFormComponent;
  let fixture: ComponentFixture<DocumentTodoSeeAllTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTodoSeeAllTaskFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTodoSeeAllTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
