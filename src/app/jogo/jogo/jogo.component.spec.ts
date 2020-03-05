import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoComponent } from './jogo.component';
import { ValidaRespostaDirective } from '../directives/valida-resposta.directive';
import { StatusJogoComponent } from '../status-jogo/status-jogo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { JogoService } from '../services/jogo.service';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { By } from '@angular/platform-browser';

fdescribe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let jogoService: JogoService;

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
});
