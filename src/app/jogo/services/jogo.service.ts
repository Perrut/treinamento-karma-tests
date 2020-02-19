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

  private jogo: Jogo;
  private perguntaAtualIndex = 0;
  private perguntaAtual: Pergunta;
  private perguntas: Pergunta[] = [];

  constructor(
    private api: JogoApiService,
    private router: Router) { }

  getJogo(): Jogo {
    return this.jogo;
  }

  criarNovoJogo(nomeJogador: string): Observable<Jogo> {
    this.jogo = new Jogo(nomeJogador);

    return this.api.criarJogo(this.jogo).pipe(
      map((jogo) => {
        if (jogo) {
          this.jogo = jogo.game;
          this.perguntas = jogo.questions;
          this.perguntaAtual = this.perguntas[0];

          return this.jogo;
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
      const proximaPergunta = this.perguntas[this.perguntaAtualIndex + 1];
      this.perguntaAtualIndex += 1;
      this.perguntaAtual = proximaPergunta;

      return proximaPergunta;
    } catch {
      this.perguntaAtualIndex = 0;
      this.perguntaAtual = null;

      return null;
    }
  }

  getPerguntaAtual(): Pergunta {
    return this.perguntaAtual;
  }

  verificaProximaPergunta(): Pergunta {
    return this.perguntas[this.perguntaAtualIndex + 1];
  }

  atualizaEstado(): void {
    this.jogo.score += this.getValorPergunta(this.perguntaAtual);
    this.jogo.questions.push(this.perguntaAtual);
  }

  encerrarJogo(): void {
    this.api.atualizarJogo(this.jogo).subscribe(
      _ => {
        setTimeout(() => this.router.navigate(['/pontuacao']), 2000);
      }
    );
  }

  getValorPergunta(pergunta: Pergunta): number {
    switch (pergunta.level) {
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
