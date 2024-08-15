import { TestBed } from '@angular/core/testing';

import { FolderTreeService } from './folder-tree.service';

describe('FolderTreeService', () => {
  let service: FolderTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
