import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPrivateFolderTreeComponent } from './document-private-folder-tree.component';

describe('DocumentPrivateFolderTreeComponent', () => {
  let component: DocumentPrivateFolderTreeComponent;
  let fixture: ComponentFixture<DocumentPrivateFolderTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPrivateFolderTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPrivateFolderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
