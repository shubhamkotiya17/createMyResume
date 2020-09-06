import { TestBed } from '@angular/core/testing';

import { ResumeServiceService } from './resume-service.service';

describe('ResumeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumeServiceService = TestBed.get(ResumeServiceService);
    expect(service).toBeTruthy();
  });
});
