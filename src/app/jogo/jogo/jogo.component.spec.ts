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

  });

  it('#inicializarJogo deve definir valor de perguntaAtual quando houver jogo acontecendo', () => {

  });

  it('#enviarResposta deve marcar resposta correta e encerrar jogo ao se enviar pergunta com resposta incorreta', async(() => {

  }));
});
