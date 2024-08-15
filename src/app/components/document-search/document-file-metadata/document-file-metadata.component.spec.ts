import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFileMetadataComponent } from './document-file-metadata.component';

describe('DocumentFileMetadataComponent', () => {
  let component: DocumentFileMetadataComponent;
  let fixture: ComponentFixture<DocumentFileMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentFileMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentFileMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
