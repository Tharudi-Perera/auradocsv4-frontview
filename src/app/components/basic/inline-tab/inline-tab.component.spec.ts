import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineTabComponent } from './inline-tab.component';

describe('InlineTabComponent', () => {
  let component: InlineTabComponent;
  let fixture: ComponentFixture<InlineTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
