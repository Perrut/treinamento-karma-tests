import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { TelaApresentacaoComponent } from './tela-apresentacao.component';
import { FormsModule } from '@angular/forms';
import { JogoService } from 'src/app/jogo/services/jogo.service';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/jogo/models/jogo';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TelaApresentacaoComponent', () => {
  let component: TelaApresentacaoComponent;
  let fixture: ComponentFixture<TelaApresentacaoComponent>;
  let jogoServiceSpy: jasmine.SpyObj<JogoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const jSSpy = jasmine.createSpyObj('JogoService', ['criarNovoJogo']);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TelaApresentacaoComponent],
      imports: [FormsModule],
      providers: [
        { provide: JogoService, useValue: jSSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    jogoServiceSpy = TestBed.get(JogoService);
    routerSpy = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaApresentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#iniciarJogo deve chamar criarNovo jogo e navegar para tela de partida', () => {
    const jogoStub = new Jogo('NomeJogador');
    jogoServiceSpy.criarNovoJogo.and.returnValue(of(jogoStub));

    component.nomeJogador = 'Teste';

    component.iniciarJogo();

    expect(jogoServiceSpy.criarNovoJogo).toHaveBeenCalledWith('Teste');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['jogo']);
  });

  it('#deve alterar nomeJogador com base no valor do input', async(() => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const el = input.nativeElement;

      expect(el.value).toBe('');

      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.nomeJogador).toBe('someValue');
    });
  }));

  it('#deve chamar iniciarJogo ao se clicar no botão do formulário', async(() => {
    const jogoStub = new Jogo('NomeJogador');
    jogoServiceSpy.criarNovoJogo.and.returnValue(of(jogoStub));

    const buttonD = fixture.debugElement.query(By.css('button'));
    const button: HTMLElement = buttonD.nativeElement;
    button.click();

    fixture.whenStable().then(() => {
      expect(jogoServiceSpy.criarNovoJogo).toHaveBeenCalled();
    });
  }));
});
