import { TestBed } from '@angular/core/testing';

import { VigilantGuardService } from './vigilant-guard.service';

describe('VigilantGuardService', () => {
  let service: VigilantGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigilantGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
