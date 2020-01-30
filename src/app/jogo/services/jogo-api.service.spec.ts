import { TestBed } from '@angular/core/testing';

import { JogoApiService } from './jogo-api.service';

describe('JogoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JogoApiService = TestBed.get(JogoApiService);
    expect(service).toBeTruthy();
  });
});
