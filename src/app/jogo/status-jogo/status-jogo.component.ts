import { Component, OnInit } from '@angular/core';
import { StatusJogoService } from '../services/status-jogo.service';

@Component({
  selector: 'app-status-jogo',
  templateUrl: './status-jogo.component.html',
  styleUrls: ['./status-jogo.component.scss']
})
export class StatusJogoComponent implements OnInit {

  public errar = '0';
  public parar = '0';
  public acertar = '0';

  constructor(
    private statusService: StatusJogoService) { }

  ngOnInit() {
    this.atualizaStatus();
  }

  atualizaStatus() {
    const novoEstado = this.statusService.atualizaStatus({ errar: this.errar, parar: this.parar, acertar: this.acertar });
    this.errar = novoEstado.errar;
    this.parar = novoEstado.parar;
    this.acertar = novoEstado.acertar;
  }
}
