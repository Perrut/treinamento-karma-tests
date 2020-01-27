import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private _jogoService: JogoService) { }

  atualizaStatus(status: {errar: string, parar: string, acertar: string}): void {
    console.log('hey');
    const proximaPergunta = this._jogoService.verificaProximaPergunta();

    status.parar = '' + this._jogoService.jogo.pontos;

    if (proximaPergunta) {
      status.errar = '' + (this._jogoService.jogo.pontos / 2);
      status.acertar = '' + (this._jogoService.jogo.pontos + proximaPergunta.valor);
    } else {
      status.errar = '0';
      status.acertar = '' + proximaPergunta.valor;
    }
  }
}
