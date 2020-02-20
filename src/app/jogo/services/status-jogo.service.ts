import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';

/**
 * Serviço responsável por atualizar as informações de pontuação que são exibidas ao usuário
 */
@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private jogoService: JogoService) { }

  /**
   * Atualiza as pontuações de perda, parada e avanço no jogo
   * @param status objeto com as respectivas pontuações
   */
  atualizaStatus(status: { errar: string, parar: string, acertar: string }): { errar: string, parar: string, acertar: string } {
    let { errar, parar, acertar } = status;
    parar = String(this.jogoService.getJogo().score);

    if (this.jogoService.verificaProximaPergunta()) {
      errar = String((this.jogoService.getJogo().score / 2));
      acertar = String((this.jogoService.getJogo().score + this.jogoService.getValorPergunta(this.jogoService.getPerguntaAtual())));
    } else {
      errar = '0';
      acertar = String(this.jogoService.getValorPergunta(this.jogoService.getPerguntaAtual()));
    }
    return { errar, parar, acertar };
  }
}
