import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { JogoService } from './jogo.service';
import { JogoApiService } from './jogo-api.service';
import { Router } from '@angular/router';
import { Jogo } from '../models/jogo';
import { of } from 'rxjs';
import { Pergunta } from '../models/pergunta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

describe('JogoService', () => {
  let service: JogoService;
  let jogoApiServiceSpy: jasmine.SpyObj<JogoApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const jsApiSpy = jasmine
      .createSpyObj('JogoApiService',
        ['criarJogo', 'responderPergunta',
          'atualizarJogo']);
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

  it('#proximaPergunta deve retornar nulo quando não houver próxima pergunta', () => {
    const proxima = service.proximaPergunta();

    expect(proxima).toBeNull();
  });

  it('#proximaPergunta deve retornar próxima pergunta do array de perguntas', (done: DoneFn) => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaStub = new Pergunta();
    perguntaStub.id = 'id-pergunta';
    const segundaPerguntaStub = new Pergunta();
    segundaPerguntaStub.id = 'id-segunda-pergunta';
    const novoJogoEPerguntasStub = { game: jogoStub, questions: [perguntaStub, segundaPerguntaStub] };
    jogoApiServiceSpy.criarJogo.and.returnValue(of(novoJogoEPerguntasStub));

    service.criarNovoJogo('NomeJogador').subscribe(_ => {
      expect(service.proximaPergunta()).toBe(segundaPerguntaStub);
      done();
    });
  });

  it('#getPerguntaAtual deve retornar pergunta correta', (done: DoneFn) => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaStub = new Pergunta();
    perguntaStub.id = 'id-pergunta';
    const segundaPerguntaStub = new Pergunta();
    segundaPerguntaStub.id = 'id-segunda-pergunta';
    const novoJogoEPerguntasStub = { game: jogoStub, questions: [perguntaStub, segundaPerguntaStub] };
    jogoApiServiceSpy.criarJogo.and.returnValue(of(novoJogoEPerguntasStub));

    service.criarNovoJogo('NomeJogador').subscribe(_ => {
      expect(service.getPerguntaAtual()).toBe(perguntaStub);
      done();
    });
  });

  it('#atualizaEstado deve atualizar estado do jogo', (done: DoneFn) => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaStub = new Pergunta();
    perguntaStub.id = 'id-pergunta';
    perguntaStub.level = DificuldadePergunta.MEDIO;
    const novoJogoEPerguntasStub = { game: jogoStub, questions: [perguntaStub] };
    jogoApiServiceSpy.criarJogo.and.returnValue(of(novoJogoEPerguntasStub));

    service.criarNovoJogo('NomeJogador').subscribe(_ => {
      service.atualizaEstado();
      expect(service.getJogo().score).toEqual(service.getValorPergunta(perguntaStub));
      expect(service.getJogo().score).toEqual(10000);
      expect(service.getJogo().questions).toContain(perguntaStub);
      done();
    });
  });

  it('#encerrarJogo deve redirecionar para tela de pontuacao', fakeAsync(() => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaStub = new Pergunta();
    perguntaStub.id = 'id-pergunta';
    perguntaStub.level = DificuldadePergunta.MEDIO;
    const novoJogoEPerguntasStub = { game: jogoStub, questions: [perguntaStub] };
    jogoApiServiceSpy.criarJogo.and.returnValue(of(novoJogoEPerguntasStub));
    jogoApiServiceSpy.atualizarJogo.and.returnValue(of(jogoStub));

    service.criarNovoJogo('NomeJogador').subscribe(_ => { });
    service.encerrarJogo();
    tick(2000);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pontuacao']);
  }));

  it('#getValorPergunta deve retornar valor correto da pergunta', () => {
    const perguntaStub = new Pergunta();
    perguntaStub.level = DificuldadePergunta.FACIL;

    expect(service.getValorPergunta(perguntaStub)).toEqual(1000);

    perguntaStub.level = DificuldadePergunta.MEDIO;

    expect(service.getValorPergunta(perguntaStub)).toEqual(10000);

    perguntaStub.level = DificuldadePergunta.DIFICIL;

    expect(service.getValorPergunta(perguntaStub)).toEqual(100000);

    perguntaStub.level = DificuldadePergunta.MUITO_DIFICIL;

    expect(service.getValorPergunta(perguntaStub)).toEqual(1000000);
  });
});
