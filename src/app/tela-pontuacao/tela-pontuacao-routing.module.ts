import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaPontuacaoComponent } from './tela-pontuacao/tela-pontuacao.component';


const routes: Routes = [
  { path: 'pontuacao', component: TelaPontuacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaPontuacaoRoutingModule { }
