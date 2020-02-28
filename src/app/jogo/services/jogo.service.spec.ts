import { TestBed } from '@angular/core/testing';

import { JogoService } from './jogo.service';
import { JogoApiService } from './jogo-api.service';
import { Router } from '@angular/router';
import { Jogo } from '../models/jogo';
import { of } from 'rxjs';
import { Pergunta } from '../models/pergunta';

describe('JogoService', () => {
  let service: JogoService;
  let jogoApiServiceSpy: jasmine.SpyObj<JogoApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const jsApiSpy = jasmine.createSpyObj('JogoApiService', ['criarJogo', 'responderPergunta']);
    const rtSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        JogoService,
        { provide: JogoApiService, useValue: jsApiSpy },
        { provide: Router, useValue: rtSpy }
      ]
    });

    service = TestBed.get(JogoService);
    jogoApiServiceSpy = TestBed.get(JogoApiService);
    routerSpy = TestBed.get(Router);
  });

  it('#criarNovoJogo deve criar novo jogo', (done: DoneFn) => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaStub = new Pergunta();
    perguntaStub.id = 'id-pergunta';
    const novoJogoEPerguntasStub = { game: jogoStub, questions: [perguntaStub] };
    jogoApiServiceSpy.criarJogo.and.returnValue(of(novoJogoEPerguntasStub));

    service.criarNovoJogo('NomeJogador').subscribe(value => {
      expect(value).toBe(jogoStub);
      expect(service.getJogo()).toBe(jogoStub);
      done();
    });
  });

  it('#responder deve chamar serviço de api para responder pergunta', (done: DoneFn) => {
    const perguntaERespostaCorretaStub = { correta: true, idCorreta: 1 };
    jogoApiServiceSpy.responderPergunta.and.returnValue(of(perguntaERespostaCorretaStub));

    service.responder('1', 1).subscribe(resposta => {
      expect(resposta).toBe(perguntaERespostaCorretaStub);
      expect(jogoApiServiceSpy.responderPergunta.calls.count()).toBe(1);
      done();
    });
  });
});
