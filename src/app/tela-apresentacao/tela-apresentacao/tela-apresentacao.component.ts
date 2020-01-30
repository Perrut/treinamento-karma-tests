import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JogoService } from 'src/app/jogo/services/jogo.service';

@Component({
  selector: 'app-tela-apresentacao',
  templateUrl: './tela-apresentacao.component.html',
  styleUrls: ['./tela-apresentacao.component.scss']
})
export class TelaApresentacaoComponent implements OnInit {

  nomeJogador = '';

  constructor(
    private jogoService: JogoService,
    private router: Router) { }

  ngOnInit() {
  }

  iniciarJogo(): void {
    const jogoRoute = 'jogo';

    this.jogoService.criarNovoJogo(this.nomeJogador).subscribe(
      (jogo) => {
        if (jogo) {
          this.router.navigate([jogoRoute]);
        }
      });
  }
}
