import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTodoAddTaskModalComponent } from './document-todo-add-task-modal.component';

describe('DocumentTodoAddTaskModalComponent', () => {
  let component: DocumentTodoAddTaskModalComponent;
  let fixture: ComponentFixture<DocumentTodoAddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTodoAddTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTodoAddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
