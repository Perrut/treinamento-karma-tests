import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoRoutingModule } from './jogo-routing.module';
import { JogoComponent } from './jogo/jogo.component';


@NgModule({
  declarations: [JogoComponent],
  imports: [
    CommonModule,
    JogoRoutingModule
  ]
})
export class JogoModule { }
