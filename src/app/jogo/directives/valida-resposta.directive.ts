import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { EstadoResposta } from '../enums/estado-resposta';

// tslint:disable: variable-name
@Directive({
  selector: '[appValidaResposta]'
})
export class ValidaRespostaDirective implements OnChanges {

  @Input('appValidaResposta') resposta: number;

  constructor(
    public el: ElementRef) {
  }

  ngOnChanges() {
    this.colorirResposta();
  }

  colorirResposta(): void {
    const corCorreta = 'green';
    const corIncorreta = 'red';

    switch (this.resposta) {
      case (EstadoResposta.CORRETA):
        this.el.nativeElement.style.backgroundColor = corCorreta;
        break;
      case (EstadoResposta.INCORRETA):
        this.el.nativeElement.style.backgroundColor = corIncorreta;
        break;
      default:
        break;
    }
  }
}
