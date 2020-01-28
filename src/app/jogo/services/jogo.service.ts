import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { Observable, of } from 'rxjs';
import { perguntas } from './perguntas';
import { EstadoResposta } from '../enums/estado-resposta';

// tslint:disable: variable-name
@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogo: Jogo;
  private _perguntaAtualIndex = 0;
  private _perguntaAtual: Pergunta;

  constructor() { }

  get jogo(): Jogo {
    return this._jogo;
  }

  criarNovoJogo(nomeJogador: string): void {
    this._jogo = new Jogo(nomeJogador);
    this._perguntaAtual = perguntas[0].pergunta;

    perguntas.forEach(p => { p.pergunta.respostas.forEach(r => { r.estadoResposta = EstadoResposta.NAO_RESPONDIDA; }); });
  }

  responder(pergunta: Pergunta, resposta: Resposta): Observable<{ correta: boolean, idCorreta: number }> {
    const perguntaASerRespondida = perguntas.find((p) => p.pergunta.id === pergunta.id);

    try {
      if (perguntaASerRespondida
        && perguntaASerRespondida.pergunta.respostas[perguntaASerRespondida.resposta].conteudo === resposta.conteudo) {
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
    this._jogo.pontos += this._perguntaAtual.valor;
  }
}
