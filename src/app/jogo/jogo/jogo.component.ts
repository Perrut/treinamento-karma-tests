import { Component, OnInit, ViewChild } from '@angular/core';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { JogoService } from '../services/jogo.service';
import { EstadoResposta } from '../enums/estado-resposta';
import { Router } from '@angular/router';
import { StatusJogoComponent } from '../status-jogo/status-jogo.component';

/**
 * Componente que controle o fluxo de perguntas e respostas do jogo
 */
@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  /**
   * Pergunta a ser respondida no momento
   */
  public perguntaAtual: Pergunta;

  /**
   * Status atual da pontuação do jogo
   */
  @ViewChild(StatusJogoComponent, { static: false }) statusComponent: StatusJogoComponent;

  constructor(
    private jogoService: JogoService,
    private router: Router) { }

  ngOnInit() {
    this.inicializarJogo();
  }

  /**
   * Envia resposta da pergunta ao backend e verifica se a mesma é a correta,
   * atualizando o estado do jogo conforme o retorno da verificação
   * @param pergunta pergunta a ser respondida
   * @param resposta resposta fornecida pelo jogador
   */
  enviarResposta(pergunta: Pergunta, resposta: Resposta): void {
    this.jogoService.responder(pergunta.id, resposta.id).subscribe((respostaEnviada) => {
      if (respostaEnviada) {
        if (respostaEnviada.correta) {
          resposta.estadoResposta = EstadoResposta.CORRETA;
          this.jogoService.atualizaEstado();
          this.proximaPergunta();
        } else {
          resposta.estadoResposta = EstadoResposta.INCORRETA;
          this.marcarRespostaCorreta(respostaEnviada.idCorreta);
          this.jogoService.getJogo().score = Number(this.statusComponent.pontosErrar);
          this.jogoService.encerrarJogo();
        }
      }
    });
  }

  /**
   * Inicializa a estrutura básica do jogo
   */
  private inicializarJogo(): void {
    if (!this.jogoService.getJogo()) {
      this.router.navigate(['/']);
    }
    this.perguntaAtual = this.jogoService.getPerguntaAtual();
  }

  /**
   * Verifica se existe mais uma pergunta a ser respondida,
   * em caso positivo, avança para a próxima pergunta,
   * em caso negativo, encerra o jogo
   */
  private proximaPergunta(): void {
    const proxima = this.jogoService.proximaPergunta();
    if (proxima) {
      setTimeout(() => {
        this.statusComponent.atualizaStatus();
        this.perguntaAtual = proxima;
      }, 2000);
    } else {
      this.jogoService.encerrarJogo();
    }
  }

  /**
   * Marca a resposta correta da pergunta caso o usuário tenha respondido errado
   * @param idCorreta id da resposta correta
   */
  private marcarRespostaCorreta(idCorreta: number): void {
    const correctAnswer = this.perguntaAtual.answers.find(
      (resposta) => {
        return resposta.id === idCorreta;
      });
    correctAnswer.estadoResposta = EstadoResposta.CORRETA;
  }
}
