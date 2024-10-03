import { TestBed } from '@angular/core/testing';

import { AdminProjectRequestService } from './admin-project-request.service';

describe('AdminProjectRequestService', () => {
  let service: AdminProjectRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProjectRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
