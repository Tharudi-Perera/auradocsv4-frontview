import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSearchModalComponent } from './document-search-modal.component';

describe('DocumentSearchModalComponent', () => {
  let component: DocumentSearchModalComponent;
  let fixture: ComponentFixture<DocumentSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSearchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
