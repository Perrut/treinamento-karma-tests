import { Component, OnInit, ViewChild } from '@angular/core';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { JogoService } from '../services/jogo.service';
import { EstadoResposta } from '../enums/estado-resposta';
import { Router } from '@angular/router';
import { StatusJogoComponent } from '../status-jogo/status-jogo.component';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  public perguntaAtual: Pergunta;

  @ViewChild(StatusJogoComponent, { static: false }) statusComponent: StatusJogoComponent;

  constructor(
    private jogoService: JogoService,
    private router: Router) { }

  ngOnInit() {
    this.inicializarJogo();
  }

  inicializarJogo(): void {
    if (!this.jogoService.getJogo()) {
      this.router.navigate(['/']);
    }
    this.perguntaAtual = this.jogoService.getPerguntaAtual();
  }

  enviarResposta(pergunta: Pergunta, resposta: Resposta): void {
    this.jogoService.responder(pergunta.id, resposta.id).subscribe((respostaCorreta) => {
      if (respostaCorreta.correta) {
        resposta.estadoResposta = EstadoResposta.CORRETA;
        this.jogoService.atualizaEstado();
        this.proximaPergunta();
      } else {
        resposta.estadoResposta = EstadoResposta.INCORRETA;
        this.marcarRespostaCorreta(respostaCorreta.idCorreta);
        this.jogoService.getJogo().score = +this.statusComponent.errar;
        this.jogoService.encerrarJogo();
      }
    });
  }

  proximaPergunta(): void {
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

  marcarRespostaCorreta(indiceCorreta: number): void {
    const correctAnswer = this.perguntaAtual.answers.find(
      (resposta) => {
        return resposta.id === indiceCorreta;
      });
    correctAnswer.estadoResposta = EstadoResposta.CORRETA;
  }
}
