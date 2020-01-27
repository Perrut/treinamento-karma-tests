import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private _jogoService: JogoService) { }

  atualizaStatus(status: { errar: string, parar: string, acertar: string }): { errar: string, parar: string, acertar: string } {
    console.log('hey');
    let { errar, parar, acertar } = status;
    parar = '' + this._jogoService.jogo.pontos;

    try {
      const proximaPergunta = this._jogoService.verificaProximaPergunta();

      errar = '' + (this._jogoService.jogo.pontos / 2);
      acertar = '' + (this._jogoService.jogo.pontos + proximaPergunta.valor);
    } catch {
      errar = '0';
      acertar = '' + this._jogoService.getPerguntaAtual().valor;
    }

    return { errar, parar, acertar };
  }
}
