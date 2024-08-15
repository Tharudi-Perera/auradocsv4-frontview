import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCartComponent } from './document-cart.component';

describe('DocumentCartComponent', () => {
  let component: DocumentCartComponent;
  let fixture: ComponentFixture<DocumentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
