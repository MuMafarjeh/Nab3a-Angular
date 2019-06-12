import { TestBed } from '@angular/core/testing';

import { StockAlarmService } from './stock-alarm.service';

describe('StockAlarmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockAlarmService = TestBed.get(StockAlarmService);
    expect(service).toBeTruthy();
  });
});
