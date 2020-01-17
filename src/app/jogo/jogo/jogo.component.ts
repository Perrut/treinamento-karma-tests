import { Component, OnInit } from '@angular/core';
import { Jogo } from '../models/jogo';
import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';
import { JogoService } from '../services/jogo.service';
import { EstadoResposta } from '../enums/estado-resposta';
import { perguntas } from '../services/perguntas';

// tslint:disable: variable-name
@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  public jogo: Jogo;

  public perguntaAtual: Pergunta;

  constructor(private _jogoService: JogoService) { }

  ngOnInit() {
    this.jogo = this._jogoService.jogo;
    this.perguntaAtual = this._jogoService.proximaPergunta();

    console.log(perguntas);
  }

  enviarResposta(pergunta: Pergunta, resposta: Resposta) {
    this._jogoService.responder(pergunta, resposta).subscribe((respostaCorreta) => {
      if (respostaCorreta) {
        resposta.estadoResposta = EstadoResposta.CORRETA;
        this.perguntaAtual = this._jogoService.proximaPergunta();
      } else {
        resposta.estadoResposta = EstadoResposta.INCORRETA;
      }
    });
  }
}
