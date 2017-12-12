import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardianService } from './auth-guardian.service';

describe('AuthGuardianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardianService]
    });
  });

  it('should be created', inject([AuthGuardianService], (service: AuthGuardianService) => {
    expect(service).toBeTruthy();
  }));
});
