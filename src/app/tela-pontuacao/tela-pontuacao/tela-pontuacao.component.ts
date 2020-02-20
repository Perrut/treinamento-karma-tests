import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JogoService } from 'src/app/jogo/services/jogo.service';

/**
 * Exibe a pontuação final do jogador
 */
@Component({
  selector: 'app-tela-pontuacao',
  templateUrl: './tela-pontuacao.component.html',
  styleUrls: ['./tela-pontuacao.component.scss']
})
export class TelaPontuacaoComponent implements OnInit {

  /**
   * Pontuação do jogador
   */
  public pontuacao = 0;

  constructor(
    private router: Router,
    private jogoService: JogoService) { }

  ngOnInit() {
    if (!this.jogoService.getJogo()) {
      this.router.navigate(['/']);
    } else {
      this.pontuacao = this.jogoService.getJogo().score;
    }
  }

  /**
   * Redireciona para a tela de apresentação
   */
  comecarNovoJogo(): void {
    this.router.navigate(['/']);
  }
}
