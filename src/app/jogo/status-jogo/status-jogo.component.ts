import { Component, OnInit } from '@angular/core';
import { StatusJogoService } from '../services/status-jogo.service';

/**
 * Componente que exibe a situação atual do jogador
 */
@Component({
  selector: 'app-status-jogo',
  templateUrl: './status-jogo.component.html',
  styleUrls: ['./status-jogo.component.scss']
})
export class StatusJogoComponent implements OnInit {

  /**
   * Pontuação ao se errar a pergunta
   */
  public errar = '0';
  /**
   * Pontuação ao se parar a partida
   */
  public parar = '0';
  /**
   * Pontuação ao se acertar a pergunta
   */
  public acertar = '0';

  constructor(
    private statusService: StatusJogoService) { }

  ngOnInit() {
    this.atualizaStatus();
  }

  /**
   * Atualiza a pontuação exibida para o jogador
   */
  atualizaStatus(): void {
    const novoEstado = this.statusService.atualizaStatus({ errar: this.errar, parar: this.parar, acertar: this.acertar });
    this.errar = novoEstado.errar;
    this.parar = novoEstado.parar;
    this.acertar = novoEstado.acertar;
  }
}
