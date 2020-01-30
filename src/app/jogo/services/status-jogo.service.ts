import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private _jogoService: JogoService) { }

  atualizaStatus(status: { errar: string, parar: string, acertar: string }): { errar: string, parar: string, acertar: string } {
    let { errar, parar, acertar } = status;
    parar = '' + this._jogoService.jogo._score;

    try {
      this._jogoService.verificaProximaPergunta();

      errar = '' + (this._jogoService.jogo._score / 2);
      acertar = '' + (this._jogoService.jogo._score + this._jogoService.getPerguntaAtual().valor);
    } catch {
      errar = '0';
      acertar = '' + this._jogoService.getPerguntaAtual().valor;
    }

    return { errar, parar, acertar };
  }
}
