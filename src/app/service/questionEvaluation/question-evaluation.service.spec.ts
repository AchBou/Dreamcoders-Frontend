import { TestBed } from '@angular/core/testing';

import { QuestionEvaluationService } from './question-evaluation.service';

describe('QuestionEvaluationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionEvaluationService = TestBed.get(QuestionEvaluationService);
    expect(service).toBeTruthy();
  });
});
