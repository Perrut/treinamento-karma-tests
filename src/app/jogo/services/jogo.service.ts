import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Observable } from 'rxjs';
import { JogoApiService } from './jogo-api.service';
import { map } from 'rxjs/operators';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private _jogo: Jogo;
  private _perguntaAtualIndex = 0;
  private _perguntaAtual: Pergunta;
  private _perguntas: Pergunta[] = [];

  constructor(
    private api: JogoApiService,
    private router: Router) { }

  get jogo(): Jogo {
    return this._jogo;
  }

  criarNovoJogo(nomeJogador: string): Observable<Jogo> {
    this._jogo = new Jogo(nomeJogador);

    return this.api.criarJogo(this.jogo).pipe(
      map((jogo) => {
        if (jogo) {
          this._jogo = jogo.game;
          this._perguntas = jogo.questions;
          this._perguntaAtual = this._perguntas[0];

          return this._jogo;
        } else {
          return null;
        }
      }));
  }

  responder(pergunta_id: string, resposta_id: number): Observable<{ correta: boolean, idCorreta: number }> {
    return this.api.responderPergunta(pergunta_id, resposta_id).pipe(
      map((correct) => {
        if (correct) {
          return correct;
        } else {
          return null;
        }
      })
    );
  }

  proximaPergunta(): Pergunta {
    try {
      const proximaPergunta = this._perguntas[this._perguntaAtualIndex + 1];
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
    return this._perguntas[this._perguntaAtualIndex + 1];
  }

  atualizaEstado(): void {
    this._jogo._score += this.getValorPergunta(this._perguntaAtual);
    this._jogo._questions.push(this._perguntaAtual);
  }

  encerrarJogo(): void {
    this.api.atualizarJogo(this._jogo).subscribe(
      _ => {
        this.router.navigate(['/pontuacao']);
      }
    );
  }

  getValorPergunta(pergunta: Pergunta): number {
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
