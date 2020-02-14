import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { Observable, of } from 'rxjs';
import { perguntas } from './perguntas';
import { JogoApiService } from './jogo-api.service';
import { map } from 'rxjs/operators';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogo: Jogo;
  private _perguntaAtualIndex = 0;
  private _perguntaAtual: Pergunta;

  constructor(private api: JogoApiService) { }

  get jogo(): Jogo {
    return this._jogo;
  }

  criarNovoJogo(nomeJogador: string): Observable<Jogo> {
    this._jogo = new Jogo(nomeJogador);

    return this.api.criarJogo(this.jogo).pipe(
      map((jogo) => {
        if (jogo) {
          this._jogo = jogo.game;
          this._perguntaAtual = jogo.questions[0];

          return this._jogo;
        } else {
          return null;
        }
      }));
  }

  responder(pergunta: Pergunta, resposta: Resposta): Observable<{ correta: boolean, idCorreta: number }> {
    const perguntaASerRespondida = perguntas.find((p) => p.pergunta.id === pergunta.id);

    try {
      if (perguntaASerRespondida
        && perguntaASerRespondida.pergunta.answers[perguntaASerRespondida.resposta].conteudo === resposta.conteudo) {
        return of({ correta: true, idCorreta: perguntaASerRespondida.resposta });
      }
      return of({ correta: false, idCorreta: perguntaASerRespondida.resposta });
    } catch (error) {
      // tslint:disable-next-line: deprecation
      Observable.throw(error);
    }
  }

  proximaPergunta(): Pergunta {
    try {
      const proximaPergunta = perguntas[this._perguntaAtualIndex + 1].pergunta;
      this._perguntaAtualIndex += 1;
      this._perguntaAtual = proximaPergunta;

      return proximaPergunta;
    } catch {
      this._perguntaAtualIndex = 0;
      this._perguntaAtual = null;

      return null;
    }
  }

  getPerguntaAtual(): Pergunta {
    return this._perguntaAtual;
  }

  verificaProximaPergunta(): Pergunta {
    return perguntas[this._perguntaAtualIndex + 1].pergunta;
  }

  atualizaPontuacao() {
    this._jogo._score += this.getValorPergunta(this._perguntaAtual);
  }

  public getValorPergunta(pergunta: Pergunta): number {
    switch (pergunta._level) {
      case DificuldadePergunta.FACIL:
        return 1000;
      case DificuldadePergunta.MEDIO:
        return 10000;
      case DificuldadePergunta.DIFICIL:
        return 100000;
      case DificuldadePergunta.MUITO_DIFICIL:
        return 1000000;
    }
  }
}
