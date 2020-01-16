import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaApresentacaoModule } from './tela-apresentacao/tela-apresentacao.module';
import { JogoModule } from './jogo/jogo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JogoModule,
    TelaApresentacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
