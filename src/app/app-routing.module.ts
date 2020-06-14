import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaPontuacaoRoutingModule } from './tela-pontuacao/tela-pontuacao-routing.module';
import { JogoRoutingModule } from './jogo/jogo-routing.module';
import { TelaApresentacaoRoutingModule } from './tela-apresentacao/tela-apresentacao-routing.module';


const routes: Routes = [];

@NgModule({
  imports: [
    JogoRoutingModule,
    TelaApresentacaoRoutingModule,
    TelaPontuacaoRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
