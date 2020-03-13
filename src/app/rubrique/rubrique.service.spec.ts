import { TestBed } from '@angular/core/testing';

import { RubriqueService } from '../editable/rubrique.service';

describe('RubriqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubriqueService = TestBed.get(RubriqueService);
    expect(service).toBeTruthy();
  });
});
