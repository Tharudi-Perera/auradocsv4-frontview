import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSearchViewFormComponent } from './document-search-view-form.component';

describe('DocumentSearchViewFormComponent', () => {
  let component: DocumentSearchViewFormComponent;
  let fixture: ComponentFixture<DocumentSearchViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSearchViewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSearchViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
