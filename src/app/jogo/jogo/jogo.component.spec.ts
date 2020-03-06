import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

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

fdescribe('JogoComponent', () => {
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

  it('#inicializarJogo deve chamar rota home quando não houver jogo acontecendo', () => {
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(component.perguntaAtual).toBeUndefined();
  });

  it('#inicializarJogo deve definir valor de perguntaAtual home quando houver jogo acontecendo', () => {
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

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(component.perguntaAtual).toBe(perguntaAtualStub);
    expect(h2.textContent).toContain(perguntaAtualStub.question);
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

    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(component.perguntaAtual).toBe(perguntaAtualStub);
    expect(h2.textContent).toContain(perguntaAtualStub.question);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('#enviarResposta deve encerrar partida quando resposta fornecida for incorreta', async(() => {
    const jogoResponse = { correct: false, correct_answer_id: 0 };
    const jogoObjResponse = new Jogo('NomeJogador');
    jogoObjResponse.id = 'teste';

    const testResponse = {game: jogoObjResponse, questions: []};

    const jogoStub = new Jogo('NomeJogador');
    jogoStub.id = 'id-jogo';

    const perguntaStub = new Pergunta();
    perguntaStub.id = (Math.random() * 10).toFixed(0);
    const respostaCorreta = new Resposta('resposta correta');
    respostaCorreta.id = 0;
    const respostaStub = new Resposta('conteúdo resposta');
    respostaStub.id = 5;
    perguntaStub.answers = [respostaStub, respostaCorreta];

    spyOn(jogoService, 'getJogo').and.returnValue(jogoStub);
    spyOn(jogoService, 'getPerguntaAtual').and.returnValue(perguntaStub);

    jogoService.criarNovoJogo('').subscribe();

    component.ngOnInit();
    fixture.detectChanges();
    component.enviarResposta(perguntaStub, respostaStub);

    fixture.detectChanges();

    let req = httpTestingController.expectOne(`${apiUrl}/games`);
    expect(req.request.method).toEqual('POST');

    req.flush(testResponse);

    req = httpTestingController.expectOne(`${apiUrl}/questions/answer/${perguntaStub.id}/${respostaStub.id}`);
    expect(req.request.method).toEqual('POST');

    req.flush(jogoResponse);

    req = httpTestingController.expectOne(`${apiUrl}/games/${jogoObjResponse.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(jogoObjResponse);
  }));
});
