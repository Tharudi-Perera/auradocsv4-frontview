import { TestBed } from '@angular/core/testing';

import { DocShareService } from './doc-share.service';

describe('DocShareService', () => {
  let service: DocShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
