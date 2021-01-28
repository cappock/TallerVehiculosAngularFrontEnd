import { TestBed } from '@angular/core/testing';

import { RepairDetailService } from './repair-detail.service';

describe('RepairDetailService', () => {
  let service: RepairDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
