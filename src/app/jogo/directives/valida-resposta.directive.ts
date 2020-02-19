import { Directive, ElementRef, Input, OnChanges, HostListener } from '@angular/core';
import { EstadoResposta } from '../enums/estado-resposta';

/**
 * Diretiva responsável por colorir as respostas com base em seu estado (CORRETA/INCORRETA)
 */
@Directive({
  selector: '[appValidaResposta]'
})
export class ValidaRespostaDirective implements OnChanges {

  /**
   * Estado da resposta à ser estilizada
   */
  @Input('appValidaResposta') resposta: EstadoResposta;

  constructor(
    public el: ElementRef) {
  }

  ngOnChanges() {
    this.colorirResposta();
  }

  /**
   * Altera o estado do cursor do mouse ao se passar por cima de uma resposta
   */
  @HostListener('mouseover')
  changeCursor(): void {
    this.el.nativeElement.style.cursor = 'pointer';
  }

  /**
   * Colore o background da resposta com base em seu estado
   */
  private colorirResposta(): void {
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
