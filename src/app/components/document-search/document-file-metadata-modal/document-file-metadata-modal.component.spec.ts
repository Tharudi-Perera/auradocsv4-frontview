import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFileMetadataModalComponent } from './document-file-metadata-modal.component';

describe('DocumentFileMetadataModalComponent', () => {
  let component: DocumentFileMetadataModalComponent;
  let fixture: ComponentFixture<DocumentFileMetadataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentFileMetadataModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentFileMetadataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
