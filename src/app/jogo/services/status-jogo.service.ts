import { Injectable } from '@angular/core';
import { JogoService } from './jogo.service';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class StatusJogoService {

  constructor(private _jogoService: JogoService) { }

  atualizaStatus(errar: string, parar: string, acertar: string): void {
    const proximaPergunta = this._jogoService.verificaProximaPergunta();

    parar = '' + this._jogoService.jogo.pontos;

    if (proximaPergunta) {
      errar = '' + (this._jogoService.jogo.pontos / 2);
      acertar = '' + (this._jogoService.jogo.pontos + proximaPergunta.valor);
    } else {
      errar = '0';
      acertar = '' + proximaPergunta.valor;
    }
  }
}
