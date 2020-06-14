import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoComponent } from './jogo/jogo.component';
import { StatusJogoComponent } from './status-jogo/status-jogo.component';
import { ValidaRespostaDirective } from './directives/valida-resposta.directive';


@NgModule({
  declarations: [JogoComponent, StatusJogoComponent, ValidaRespostaDirective],
  imports: [
    CommonModule,
  ]
})
export class JogoModule { }
