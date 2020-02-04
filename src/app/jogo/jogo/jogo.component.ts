import { Component, OnInit, ViewChild } from '@angular/core';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { JogoService } from '../services/jogo.service';
import { EstadoResposta } from '../enums/estado-resposta';
import { Router } from '@angular/router';
import { StatusJogoComponent } from '../status-jogo/status-jogo.component';

// tslint:disable: variable-name
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
    this.perguntaAtual = this._jogoService.getPerguntaAtual();
  }

  enviarResposta(pergunta: Pergunta, resposta: Resposta): void {
    this._jogoService.responder(pergunta, resposta).subscribe((respostaCorreta) => {
      if (respostaCorreta.correta) {
        resposta.estadoResposta = EstadoResposta.CORRETA;
        this._jogoService.atualizaPontuacao();
        this.proximaPergunta();
      } else {
        resposta.estadoResposta = EstadoResposta.INCORRETA;
        this.marcarRespostaCorreta(respostaCorreta.idCorreta);
        this._router.navigate(['/pontuacao']);
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
    this.perguntaAtual.respostas[indiceCorreta].estadoResposta = EstadoResposta.CORRETA;
  }
}
