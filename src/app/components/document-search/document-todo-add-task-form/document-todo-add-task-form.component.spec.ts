import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTodoAddTaskFormComponent } from './document-todo-add-task-form.component';

describe('DocumentTodoAddTaskFormComponent', () => {
  let component: DocumentTodoAddTaskFormComponent;
  let fixture: ComponentFixture<DocumentTodoAddTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTodoAddTaskFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTodoAddTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
