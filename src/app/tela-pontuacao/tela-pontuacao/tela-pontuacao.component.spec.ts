import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPontuacaoComponent } from './tela-pontuacao.component';
import { Router } from '@angular/router';
import { JogoService } from 'src/app/jogo/services/jogo.service';
import { By } from '@angular/platform-browser';
import { Jogo } from 'src/app/jogo/models/jogo';

describe('TelaPontuacaoComponent', () => {
  let component: TelaPontuacaoComponent;
  let fixture: ComponentFixture<TelaPontuacaoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let jogoServiceSpy: jasmine.SpyObj<JogoService>;

  beforeEach(() => {
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);
    const jSSpy = jasmine.createSpyObj('JogoService', ['getJogo']);

    TestBed.configureTestingModule({
      declarations: [TelaPontuacaoComponent],
      providers: [
        { provide: Router, useValue: rSpy },
        { provide: JogoService, useValue: jSSpy }
      ]
    });

    routerSpy = TestBed.get(Router);
    jogoServiceSpy = TestBed.get(JogoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPontuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#verificarJogoExistente deve chamar navigate para home quando não houver jogo', () => {
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('#verificarJogoExistente deve atualizar valor de pontuação com valor de pontuação do jogo', () => {
    const element = fixture.debugElement.query(By.css('p'));
    const p: HTMLElement = element.nativeElement;

    expect(p.textContent).toContain('0 pontos.');

    const jogoStub = new Jogo('NomeJogador');
    const pontos = Math.ceil(Math.random() * 10);
    jogoStub.score = pontos;
    jogoServiceSpy.getJogo.and.returnValue(jogoStub);

    component.ngOnInit();
    fixture.detectChanges();

    expect(p.textContent).toContain(`${pontos} pontos`);
  });

  it('#comecarNovoJogo deve chamar navigate para home', () => {
    component.comecarNovoJogo();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
