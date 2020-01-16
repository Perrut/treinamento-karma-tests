import { Injectable } from '@angular/core';
import { Jogo } from './jogo';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogo: Jogo;

  constructor() { }

  criarNovoJogo(nomeJogador: string): void {
    this._jogo = new Jogo(nomeJogador);

    console.log(this._jogo);
  }
}
