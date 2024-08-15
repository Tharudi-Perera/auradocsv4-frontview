import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTodoSeeAllTaskModalComponent } from './document-todo-see-all-task-modal.component';

describe('DocumentTodoSeeAllTaskModalComponent', () => {
  let component: DocumentTodoSeeAllTaskModalComponent;
  let fixture: ComponentFixture<DocumentTodoSeeAllTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTodoSeeAllTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTodoSeeAllTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
