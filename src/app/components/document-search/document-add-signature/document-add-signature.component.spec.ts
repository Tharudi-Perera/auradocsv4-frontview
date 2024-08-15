import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddSignatureComponent } from './document-add-signature.component';

describe('DocumentAddSignatureComponent', () => {
  let component: DocumentAddSignatureComponent;
  let fixture: ComponentFixture<DocumentAddSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentAddSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentAddSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
