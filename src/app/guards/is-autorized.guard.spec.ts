import { TestBed } from '@angular/core/testing';

import { IsAutorizedGuard } from './is-autorized.guard';

describe('IsAutorizedGuard', () => {
  let guard: IsAutorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAutorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
