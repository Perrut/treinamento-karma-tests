import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoRoutingModule } from './jogo-routing.module';
import { JogoComponent } from './jogo/jogo.component';
import { StatusJogoComponent } from './status-jogo/status-jogo.component';
import { ValidaRespostaDirective } from './directives/valida-resposta.directive';


@NgModule({
  declarations: [JogoComponent, StatusJogoComponent, ValidaRespostaDirective],
  imports: [
    CommonModule,
    JogoRoutingModule
  ]
})
export class JogoModule { }
