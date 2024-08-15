import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFileMetadataFormComponent } from './document-file-metadata-form.component';

describe('DocumentFileMetadataFormComponent', () => {
  let component: DocumentFileMetadataFormComponent;
  let fixture: ComponentFixture<DocumentFileMetadataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentFileMetadataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentFileMetadataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
