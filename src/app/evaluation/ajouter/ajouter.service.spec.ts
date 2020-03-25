import { TestBed } from '@angular/core/testing';

import { AjouterService } from './ajouter.service';

describe('AjouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjouterService = TestBed.get(AjouterService);
    expect(service).toBeTruthy();
  });
});
