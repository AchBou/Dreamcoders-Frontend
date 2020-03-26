import { TestBed } from '@angular/core/testing';

import { RubriqueEvalService } from './rubrique-eval.service';

describe('RubriqueEvalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RubriqueEvalService = TestBed.get(RubriqueEvalService);
    expect(service).toBeTruthy();
  });
});
