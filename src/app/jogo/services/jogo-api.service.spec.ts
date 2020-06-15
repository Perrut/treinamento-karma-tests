import { TestBed } from '@angular/core/testing';

import { JogoApiService } from './jogo-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Jogo } from '../models/jogo';

describe('JogoApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: JogoApiService;

  const apiUrl = 'https://salty-tor-81757.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JogoApiService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(JogoApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#criarJogo deve retornar objeto de jogo correto', () => {

  });

  it('#criarJogo deve retornar objeto de jogo nulo com erro no request', () => {

  });

  it('#atualizarJogo deve retornar objeto de jogo correto', () => {

  });

  it('#responderPergunta deve retornar objeto de resposta correto', () => {

  });
});
