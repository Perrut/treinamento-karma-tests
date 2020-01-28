import { Component, OnInit } from '@angular/core';
import { StatusJogoService } from '../services/status-jogo.service';

// tslint:disable: variable-name
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
    private _statusService: StatusJogoService) { }

  ngOnInit() {
    this.atualizaStatus();
  }

  atualizaStatus() {
    const novoEstado = this._statusService.atualizaStatus({ errar: this.errar, parar: this.parar, acertar: this.acertar });
    this.errar = novoEstado.errar;
    this.parar = novoEstado.parar;
    this.acertar = novoEstado.acertar;
  }
}
