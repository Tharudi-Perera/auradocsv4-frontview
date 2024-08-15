import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailsGroupsComponent } from './document-details-groups.component';

describe('DocumentDetailsGroupsComponent', () => {
  let component: DocumentDetailsGroupsComponent;
  let fixture: ComponentFixture<DocumentDetailsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDetailsGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
