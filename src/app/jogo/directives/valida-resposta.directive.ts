import { Directive, ElementRef, Input, OnChanges, HostListener } from '@angular/core';
import { EstadoResposta } from '../enums/estado-resposta';

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

  @HostListener('mouseover')
  changeCursor(): void {
    this.el.nativeElement.style.cursor = 'pointer';
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
