import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBlockchainComponent } from './document-blockchain.component';

describe('DocumentBlockchainComponent', () => {
  let component: DocumentBlockchainComponent;
  let fixture: ComponentFixture<DocumentBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentBlockchainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
