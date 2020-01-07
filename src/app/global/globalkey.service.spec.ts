import { TestBed } from '@angular/core/testing';

import { GlobalkeyService } from './globalkey.service';

describe('GlobalkeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalkeyService = TestBed.get(GlobalkeyService);
    expect(service).toBeTruthy();
  });
});
