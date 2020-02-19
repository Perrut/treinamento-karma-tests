import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JogoService } from 'src/app/jogo/services/jogo.service';

@Component({
  selector: 'app-tela-pontuacao',
  templateUrl: './tela-pontuacao.component.html',
  styleUrls: ['./tela-pontuacao.component.scss']
})
export class TelaPontuacaoComponent implements OnInit {

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

  comecarNovoJogo(): void {
    this.router.navigate(['/']);
  }
}
