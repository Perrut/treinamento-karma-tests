import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TelaApresentacaoRoutingModule } from './tela-apresentacao-routing.module';
import { TelaApresentacaoComponent } from './tela-apresentacao/tela-apresentacao.component';


@NgModule({
  declarations: [TelaApresentacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    TelaApresentacaoRoutingModule
  ]
})
export class TelaApresentacaoModule { }
