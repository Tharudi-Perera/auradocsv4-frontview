import { TestBed } from '@angular/core/testing';

import { NoOfPendingDocsService } from './no-of-pending-docs.service';

describe('NoOfPendingDocsService', () => {
  let service: NoOfPendingDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoOfPendingDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
