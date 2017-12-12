import { TestBed, inject } from '@angular/core/testing';

import { NoauthGuardianService } from './noauth-guardian.service';

describe('NoauthGuardianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoauthGuardianService]
    });
  });

  it('should be created', inject([NoauthGuardianService], (service: NoauthGuardianService) => {
    expect(service).toBeTruthy();
  }));
});
