import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocumentsTreeComponent } from './my-documents-tree.component';

describe('MyDocumentsTreeComponent', () => {
  let component: MyDocumentsTreeComponent;
  let fixture: ComponentFixture<MyDocumentsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDocumentsTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDocumentsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
