import { TestBed } from '@angular/core/testing';

import { QualificatifService } from './qualificatif.service';

describe('QualificatifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualificatifService = TestBed.get(QualificatifService);
    expect(service).toBeTruthy();
  });
});
