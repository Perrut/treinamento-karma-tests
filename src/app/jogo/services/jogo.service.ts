import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Observable } from 'rxjs';
import { JogoApiService } from './jogo-api.service';
import { map } from 'rxjs/operators';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';
import { Router } from '@angular/router';

/**
 * Serviço responsável por controlar o estado da partida
 */
@Injectable({
  providedIn: 'root'
})
export class JogoService {

  /**
   * Jogo atual
   */
  private jogo: Jogo;
  /**
   * Índice da pergunta a ser respondida
   */
  private perguntaAtualIndex = 0;
  /**
   * Pergunta ser respondida
   */
  private perguntaAtual: Pergunta;
  /**
   * Perguntas da partida atual
   */
  private perguntas: Pergunta[] = [];

  constructor(
    private api: JogoApiService,
    private router: Router) { }

  /**
   * Retorna o jogo atual
   */
  getJogo(): Jogo {
    return this.jogo;
  }

  /**
   * Cria um novo jogo
   * @param nomeJogador nome do jogador
   */
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

  /**
   * Verifica se a resposta submetida à pergunta corrente é correta
   * @param pergunta_id id da pergunta
   * @param resposta_id id da resposta
   */
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

  /**
   * Avança para a próxima pergunta do jogo, se houver
   */
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

  /**
   * @returns Pergunta atual do jogo
   */
  getPerguntaAtual(): Pergunta {
    return this.perguntaAtual;
  }

  /**
   * Retorna a próxima pergunta do jogo
   * @returns próxima pergunta ou undefined caso não exista próxima pergunta
   */
  verificaProximaPergunta(): Pergunta {
    return this.perguntas[this.perguntaAtualIndex + 1];
  }

  /**
   * Atualiza pontuação e quantidade de perguntas respondidas da partida
   */
  atualizaEstado(): void {
    this.jogo.score += this.getValorPergunta(this.perguntaAtual);
    this.jogo.questions.push(this.perguntaAtual);
  }

  /**
   * Encerra a partida e redireciona para tela de exibição da pontuação
   */
  encerrarJogo(): void {
    this.api.atualizarJogo(this.jogo).subscribe(
      _ => {
        setTimeout(() => this.router.navigate(['/pontuacao']), 2000);
      }
    );
  }

  /**
   * Retorna o valor em pontos da pergunta com base em sua dificuldade
   * @param pergunta Pergunta a ter seu valor retornado
   */
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
