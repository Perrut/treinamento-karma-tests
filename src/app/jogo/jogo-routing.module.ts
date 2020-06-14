import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JogoComponent } from './jogo/jogo.component';


const routes: Routes = [
  { path: 'jogo', component: JogoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class JogoRoutingModule { }
