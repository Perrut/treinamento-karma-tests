import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPontuacaoComponent } from './tela-pontuacao.component';

describe('TelaPontuacaoComponent', () => {
  let component: TelaPontuacaoComponent;
  let fixture: ComponentFixture<TelaPontuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaPontuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPontuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
