import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaApresentacaoComponent } from './tela-apresentacao/tela-apresentacao.component';


const routes: Routes = [
  { path: '', component: TelaApresentacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TelaApresentacaoRoutingModule { }
