import { Component, OnInit } from '@angular/core';
import { JogoService } from '../services/jogo.service';

// tslint:disable: variable-name
@Component({
  selector: 'app-status-jogo',
  templateUrl: './status-jogo.component.html',
  styleUrls: ['./status-jogo.component.scss']
})
export class StatusJogoComponent implements OnInit {

  public errar = '';
  public parar = '';
  public acertar = '';

  constructor(private _jogoService: JogoService) { }

  ngOnInit() {
  }

}
