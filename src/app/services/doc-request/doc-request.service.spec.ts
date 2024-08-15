import { TestBed } from '@angular/core/testing';

import { DocRequestService } from './doc-request.service';

describe('DocRequestService', () => {
  let service: DocRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
