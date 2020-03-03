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
    component.estado = EstadoResposta.INCORRETA;

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('p'));

    expect(element.nativeElement.style.backgroundColor).toEqual('red');
  });

  it('#colorirResposta deve colorir de verde resposta incorreta', () => {
    component.estado = EstadoResposta.CORRETA;

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('p'));

    expect(element.nativeElement.style.backgroundColor).toEqual('green');
  });

  it('#changeCursor deve transformar cursor em pointer em mouseover', () => {
    const element = fixture.debugElement.query(By.css('p'));

    element.triggerEventHandler('mouseover', null);

    expect(element.nativeElement.style.cursor).toEqual('pointer');
  });
});
