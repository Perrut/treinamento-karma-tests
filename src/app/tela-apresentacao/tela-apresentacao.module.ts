import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelaApresentacaoRoutingModule } from './tela-apresentacao-routing.module';
import { TelaApresentacaoComponent } from './tela-apresentacao/tela-apresentacao.component';


@NgModule({
  declarations: [TelaApresentacaoComponent],
  imports: [
    CommonModule,
    TelaApresentacaoRoutingModule
  ]
})
export class TelaApresentacaoModule { }
