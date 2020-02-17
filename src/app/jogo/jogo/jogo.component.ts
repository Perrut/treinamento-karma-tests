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
    private _jogoService: JogoService,
    private _router: Router) { }

  ngOnInit() {
    if (!this._jogoService.jogo) {
      this._router.navigate(['/']);
    }

    this.perguntaAtual = this._jogoService.getPerguntaAtual();
  }

  enviarResposta(pergunta: Pergunta, resposta: Resposta): void {
    this._jogoService.responder(pergunta.id, resposta.id).subscribe((respostaCorreta) => {
      if (respostaCorreta.correta) {
        resposta._estadoResposta = EstadoResposta.CORRETA;
        this._jogoService.atualizaPontuacao();
        this.proximaPergunta();
      } else {
        resposta._estadoResposta = EstadoResposta.INCORRETA;
        this.marcarRespostaCorreta(respostaCorreta.idCorreta);
        setTimeout(() => this._router.navigate(['/pontuacao']), 2000);
      }
    });
  }

  proximaPergunta(): void {
    const proxima = this._jogoService.proximaPergunta();
    if (proxima) {
      setTimeout(() => {
        this.statusComponent.atualizaStatus();
        this.perguntaAtual = proxima;
      }, 2000);
    } else {
      setTimeout(() => this._router.navigate(['/pontuacao']), 2000);
    }
  }

  marcarRespostaCorreta(indiceCorreta: number): void {
    const correctAnswer = this.perguntaAtual.answers.find(
      (resposta) => {
        return resposta.id === indiceCorreta;
      });
    correctAnswer._estadoResposta = EstadoResposta.CORRETA;
  }
}
