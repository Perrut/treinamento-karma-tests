import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoComponent } from './jogo.component';
import { ValidaRespostaDirective } from '../directives/valida-resposta.directive';
import { StatusJogoComponent } from '../status-jogo/status-jogo.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { JogoService } from '../services/jogo.service';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Resposta } from '../models/resposta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';
import { EstadoResposta } from '../enums/estado-resposta';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let jogoService: JogoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const apiUrl = 'https://salty-tor-81757.herokuapp.com';

  beforeEach(() => {
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        JogoComponent,
        StatusJogoComponent,
        ValidaRespostaDirective
      ],
      providers: [
        { provide: Router, useValue: rSpy }
      ]
    });

    routerSpy = TestBed.get(Router);
    jogoService = TestBed.get(JogoService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#inicializarJogo deve chamar rota home quando não houver jogo acontecendo', () => {
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(component.perguntaAtual).toBeUndefined();
  });

  it('#inicializarJogo deve definir valor de perguntaAtual quando houver jogo acontecendo', () => {
    const jogoStub = new Jogo('NomeJogador');
    const perguntaAtualStub = new Pergunta();
    perguntaAtualStub.id = 'id-pergunta';
    perguntaAtualStub.question = 'fake question';

    spyOn(jogoService, 'getJogo').and.returnValue(jogoStub);
    spyOn(jogoService, 'getPerguntaAtual').and.returnValue(perguntaAtualStub);

    component.ngOnInit();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('h2'));
    const h2: HTMLElement = element.nativeElement;

    // é chamado sempre uma vez por conta do beforeEach
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(component.perguntaAtual).toBe(perguntaAtualStub);
    expect(h2.textContent).toContain(perguntaAtualStub.question);
  });

  it('#enviarResposta deve marcar resposta correta e encerrar jogo ao se enviar pergunta com resposta incorreta', async(() => {
    const idRespostaCorreta = 1;
    const objRespostaStub = { correct: false, correct_answer_id: idRespostaCorreta };
    const perguntaStub = new Pergunta();
    perguntaStub.level = DificuldadePergunta.DIFICIL;
    perguntaStub.id = '2';
    const respostaStub = new Resposta('resposta incorreta');
    respostaStub.id = 3;
    const jogoStub = new Jogo('NomeJogador');
    jogoStub.id = '4';
    const respostaCorretaStub = new Resposta('resposta correta');
    respostaCorretaStub.id = idRespostaCorreta;
    perguntaStub.answers = [respostaStub, respostaCorretaStub];
    const jogoObjStub = { game: jogoStub, questions: [perguntaStub] };

    const spyt = spyOn(jogoService, 'encerrarJogo');
    spyt.and.callThrough();

    jogoService.criarNovoJogo('NomeJogador').subscribe(_ => {
      component.perguntaAtual = perguntaStub;
      fixture.detectChanges();
      component.enviarResposta(perguntaStub, respostaStub);
      fixture.detectChanges();

      fixture.whenStable().then(__ => {
        expect(respostaStub.estadoResposta).toBe(EstadoResposta.INCORRETA);
        expect(jogoStub.score).toBe(0);
        expect(spyt).toHaveBeenCalledTimes(1);
      });

    });

    let req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush(jogoObjStub);

    req = httpTestingController.expectOne(`${apiUrl}/questions/answer/${perguntaStub.id}/${respostaStub.id}`);
    expect(req.request.method).toEqual('POST');

    req.flush(objRespostaStub);

    req = httpTestingController.expectOne(`${apiUrl}/games/${jogoStub.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(jogoStub);
  }));

  it('#enviarResposta deve obter marcar resposta correta e encerrar jogo ao se enviar pergunta com resposta incorreta', async(() => {
    const idRespostaCorreta = 1;
    const objRespostaStub = { correct: true, correct_answer_id: idRespostaCorreta };
    const perguntaStub = new Pergunta();
    perguntaStub.level = DificuldadePergunta.DIFICIL;
    perguntaStub.id = '2';
    const respostaStub = new Resposta('resposta incorreta');
    respostaStub.id = 3;
    const jogoStub = new Jogo('NomeJogador');
    jogoStub.id = '4';
    const respostaCorretaStub = new Resposta('resposta correta');
    respostaCorretaStub.id = idRespostaCorreta;
    perguntaStub.answers = [respostaStub, respostaCorretaStub];
    const jogoObjStub = { game: jogoStub, questions: [perguntaStub] };

    const spyProximaPergunta = spyOn(jogoService, 'proximaPergunta');
    spyProximaPergunta.and.callThrough();
    const spyEncerrarJogo = spyOn(jogoService, 'encerrarJogo');
    spyEncerrarJogo.and.callThrough();

    jogoService.criarNovoJogo('NomeJogador').subscribe(_ => {
      component.perguntaAtual = perguntaStub;
      fixture.detectChanges();
      component.enviarResposta(perguntaStub, respostaCorretaStub);
      fixture.detectChanges();

      fixture.whenStable().then(__ => {
        expect(respostaCorretaStub.estadoResposta).toBe(EstadoResposta.CORRETA);
        expect(jogoStub.score).toBe(100000);
        expect(spyProximaPergunta).toHaveBeenCalledTimes(1);
        expect(spyEncerrarJogo).toHaveBeenCalledTimes(1);
      });

    });

    let req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush(jogoObjStub);

    req = httpTestingController.expectOne(`${apiUrl}/questions/answer/${perguntaStub.id}/${respostaCorretaStub.id}`);
    expect(req.request.method).toEqual('POST');

    req.flush(objRespostaStub);

    req = httpTestingController.expectOne(`${apiUrl}/games/${jogoStub.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(jogoStub);
  }));

  it('#enviarResposta deve obter marcar resposta correta e encerrar jogo ao se enviar pergunta com resposta incorreta', async(() => {
    const idRespostaCorreta = 1;
    const objRespostaStub = { correct: true, correct_answer_id: idRespostaCorreta };
    const perguntaStub = new Pergunta();
    perguntaStub.level = DificuldadePergunta.DIFICIL;
    perguntaStub.id = '2';
    const proximaPerguntaStub = new Pergunta();
    perguntaStub.level = DificuldadePergunta.DIFICIL;
    perguntaStub.id = '3';
    const respostaStub = new Resposta('resposta incorreta');
    respostaStub.id = 3;
    const jogoStub = new Jogo('NomeJogador');
    jogoStub.id = '4';
    const respostaCorretaStub = new Resposta('resposta correta');
    respostaCorretaStub.id = idRespostaCorreta;
    perguntaStub.answers = [respostaStub, respostaCorretaStub];
    proximaPerguntaStub.answers = [respostaStub, respostaCorretaStub];
    const jogoObjStub = { game: jogoStub, questions: [perguntaStub, proximaPerguntaStub] };

    const spyProximaPergunta = spyOn(jogoService, 'proximaPergunta');
    spyProximaPergunta.and.callThrough();

    jogoService.criarNovoJogo('NomeJogador').subscribe(_ => {
      component.perguntaAtual = perguntaStub;
      fixture.detectChanges();

      const spyStatusComponent = spyOn(component.statusComponent, 'atualizaStatus');
      spyStatusComponent.and.callThrough();

      component.enviarResposta(perguntaStub, respostaCorretaStub);
      fixture.detectChanges();

      fixture.whenStable().then(__ => {
        expect(respostaCorretaStub.estadoResposta).toBe(EstadoResposta.CORRETA);
        expect(jogoStub.score).toBe(100000);
        expect(spyProximaPergunta).toHaveBeenCalledTimes(1);
        setTimeout(() => expect(spyStatusComponent).toHaveBeenCalledTimes(1), 2000);
      });

    });

    let req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush(jogoObjStub);

    req = httpTestingController.expectOne(`${apiUrl}/questions/answer/${perguntaStub.id}/${respostaCorretaStub.id}`);
    expect(req.request.method).toEqual('POST');

    req.flush(objRespostaStub);
  }));
});
