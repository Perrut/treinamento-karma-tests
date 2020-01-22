import { TestBed } from '@angular/core/testing';

import { StatusJogoService } from './status-jogo.service';

describe('StatusJogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusJogoService = TestBed.get(StatusJogoService);
    expect(service).toBeTruthy();
  });
});
