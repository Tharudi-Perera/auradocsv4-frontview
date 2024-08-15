import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelButtonsComponent } from './admin-panel-buttons.component';

describe('AdminPanelButtonsComponent', () => {
  let component: AdminPanelButtonsComponent;
  let fixture: ComponentFixture<AdminPanelButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
