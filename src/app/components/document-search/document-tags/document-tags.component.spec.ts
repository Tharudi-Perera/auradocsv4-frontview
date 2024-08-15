import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTagsComponent } from './document-tags.component';

describe('DocumentTagsComponent', () => {
  let component: DocumentTagsComponent;
  let fixture: ComponentFixture<DocumentTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
