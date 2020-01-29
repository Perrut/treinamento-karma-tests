import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelaPontuacaoRoutingModule } from './tela-pontuacao-routing.module';
import { TelaPontuacaoComponent } from './tela-pontuacao/tela-pontuacao.component';


@NgModule({
  declarations: [TelaPontuacaoComponent],
  imports: [
    CommonModule,
    TelaPontuacaoRoutingModule
  ]
})
export class TelaPontuacaoModule { }
