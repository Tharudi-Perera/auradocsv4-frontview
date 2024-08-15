import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentWorkflowComponent } from './document-workflow.component';

describe('DocumentWorkflowComponent', () => {
  let component: DocumentWorkflowComponent;
  let fixture: ComponentFixture<DocumentWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
