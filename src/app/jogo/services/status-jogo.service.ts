import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';

@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private jogoService: JogoService) { }

  atualizaStatus(status: { errar: string, parar: string, acertar: string }): { errar: string, parar: string, acertar: string } {
    let { errar, parar, acertar } = status;
    parar = '' + this.jogoService.getJogo().score;

    try {
      this.jogoService.verificaProximaPergunta();

      errar = '' + (this.jogoService.getJogo().score / 2);
      acertar = '' + (this.jogoService.getJogo().score + this.jogoService.getValorPergunta(this.jogoService.getPerguntaAtual()));
    } catch {
      errar = '0';
      acertar = '' + this.jogoService.getValorPergunta(this.jogoService.getPerguntaAtual());
    }
    return { errar, parar, acertar };
  }
}
