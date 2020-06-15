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

  it('#atualizaEstado deve atualizar estado do jogo', (done: DoneFn) => {

  });

  it('#encerrarJogo deve redirecionar para tela de pontuacao', fakeAsync(() => {

  }));
});
