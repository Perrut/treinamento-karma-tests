import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaApresentacaoComponent } from './tela-apresentacao.component';
import { FormsModule } from '@angular/forms';
import { JogoService } from 'src/app/jogo/services/jogo.service';
import { Router } from '@angular/router';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
