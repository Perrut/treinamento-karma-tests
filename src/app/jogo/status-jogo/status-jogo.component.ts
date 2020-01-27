import { Component, OnInit } from '@angular/core';
import { JogoService } from '../services/jogo.service';
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
    private _jogoService: JogoService,
    private _statusService: StatusJogoService) { }

  ngOnInit() {
    this._statusService.atualizaStatus({ errar: this.errar, parar: this.parar, acertar: this.acertar });
  }

  atualizaStatus() {
    this._statusService.atualizaStatus({ errar: this.errar, parar: this.parar, acertar: this.acertar });
    console.log({ errar: this.errar, parar: this.parar, acertar: this.acertar });
  }
}
