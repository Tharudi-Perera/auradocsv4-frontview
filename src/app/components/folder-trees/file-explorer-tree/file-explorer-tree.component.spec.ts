import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerTreeComponent } from './file-explorer-tree.component';

describe('FileExplorerTreeComponent', () => {
  let component: FileExplorerTreeComponent;
  let fixture: ComponentFixture<FileExplorerTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExplorerTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExplorerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
