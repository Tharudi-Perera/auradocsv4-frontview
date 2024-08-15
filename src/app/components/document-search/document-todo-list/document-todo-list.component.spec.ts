import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTodoListComponent } from './document-todo-list.component';

describe('DocumentTodoListComponent', () => {
  let component: DocumentTodoListComponent;
  let fixture: ComponentFixture<DocumentTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTodoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
