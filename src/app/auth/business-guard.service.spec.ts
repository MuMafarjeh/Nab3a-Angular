import { TestBed } from '@angular/core/testing';

import { BusinessGuard } from './business-guard.service';

describe('UserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessGuard = TestBed.get(BusinessGuard);
    expect(service).toBeTruthy();
  });
});
