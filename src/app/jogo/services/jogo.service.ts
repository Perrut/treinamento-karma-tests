import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { Observable, of } from 'rxjs';
import { perguntas } from './perguntas';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogo: Jogo;

  private _perguntaAtual = 0;

  constructor() { }

  get jogo(): Jogo {
    return this._jogo;
  }

  criarNovoJogo(nomeJogador: string): void {
    this._jogo = new Jogo(nomeJogador);
  }

  responder(pergunta: Pergunta, resposta: Resposta): Observable<boolean> {
    const perguntaASerRespondida = perguntas.find((p) => p.pergunta.id === pergunta.id);

    try {
      if (perguntaASerRespondida
        && perguntaASerRespondida.pergunta.respostas[perguntaASerRespondida.resposta].conteudo === resposta.conteudo) {
        return of(true);
      }
      return of(false);
    } catch (error) {
      // tslint:disable-next-line: deprecation
      Observable.throw(error);
    }
  }

  proximaPergunta(): Pergunta {
    const proximaPergunta = perguntas[this._perguntaAtual].pergunta;

    this._perguntaAtual += 1;

    return proximaPergunta;
  }
}
