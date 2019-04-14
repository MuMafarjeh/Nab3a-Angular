import { TestBed } from '@angular/core/testing';

import { LoadingControllerService } from './loading-controller.service';

describe('LoadingControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingControllerService = TestBed.get(LoadingControllerService);
    expect(service).toBeTruthy();
  });
});
