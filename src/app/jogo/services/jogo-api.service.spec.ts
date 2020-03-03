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
    const jogoResponseData = new Jogo('NomeJogador');
    jogoResponseData.id = 'id-novo-jogo';
    const jogoResponse = { game: jogoResponseData, questions: [] };

    service.criarJogo(new Jogo('NomeJogador')).subscribe(
      jogo => expect(jogo).toBe(jogoResponse)
    );

    const req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush(jogoResponse);
  });

  it('#criarJogo deve retornar objeto de jogo nulo com erro no request', () => {
    service.criarJogo(new Jogo('NomeJogador')).subscribe(
      jogo => expect(jogo).toBeNull()
    );

    const req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush('Erro interno', { status: 500, statusText: 'Internal Server Error' });
  });

  it('#atualizarJogo deve retornar objeto de jogo correto', () => {
    const jogoOld = new Jogo('NomeJogador');
    jogoOld.id = 'id-novo-jogo';

    const jogoResponse = new Jogo('NomeJogador');
    jogoResponse.id = 'id-novo-jogo';
    jogoResponse.score = 10;

    service.atualizarJogo(jogoOld).subscribe(
      jogo => {
        expect(jogo).toBe(jogoResponse);
        expect(jogo.score).not.toEqual(jogoOld.score);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/games/${jogoOld.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(jogoResponse);
  });

  it('#responderPergunta deve retornar objeto de resposta correto', () => {
    const randomBoolean = Math.random() >= 0.5;
    const randomNumber = Math.random() * 10;

    const objRespostaCorreta = { correct: randomBoolean, correct_answer_id: randomNumber };

    const { perguntaId, respostaId } = { perguntaId: String(Math.random() * 10), respostaId: Math.random() * 10 };
    service.responderPergunta(perguntaId, respostaId).subscribe(
      respostaCorreta => {
        expect(respostaCorreta.correta).toEqual(objRespostaCorreta.correct);
        expect(respostaCorreta.idCorreta).toEqual(objRespostaCorreta.correct_answer_id);
      });

    const req = httpTestingController.expectOne(`${apiUrl}/questions/answer/${perguntaId}/${respostaId}`);
    expect(req.request.method).toEqual('POST');

    req.flush(objRespostaCorreta);
  });
});
