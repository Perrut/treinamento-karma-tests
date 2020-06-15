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

  it('#deve alterar nomeJogador com base no valor do input', async(() => {

  }));

  it('#deve chamar iniciarJogo ao se clicar no botão do formulário', async(() => {

  }));
});
