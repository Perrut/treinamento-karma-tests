import { ValidaRespostaDirective } from './valida-resposta.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EstadoResposta } from '../enums/estado-resposta';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <p [appValidaResposta]="estado">Componente de Teste</p>
  `
})
class TestComponent {
  estado: EstadoResposta = EstadoResposta.NAO_RESPONDIDA;
}

describe('ValidaRespostaDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ValidaRespostaDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('#colorirResposta deve colorir de vermelho resposta incorreta', () => {

  });

  it('#colorirResposta deve colorir de verde resposta incorreta', () => {

  });

  it('#changeCursor deve transformar cursor em pointer em mouseover', () => {

  });
});
