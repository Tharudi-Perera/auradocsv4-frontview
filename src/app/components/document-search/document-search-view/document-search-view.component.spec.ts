import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSearchViewComponent } from './document-search-view.component';

describe('DocumentSearchViewComponent', () => {
  let component: DocumentSearchViewComponent;
  let fixture: ComponentFixture<DocumentSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSearchViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
