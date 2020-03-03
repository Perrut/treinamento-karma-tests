import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../models/jogo';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pergunta } from '../models/pergunta';

/**
 * Serviço responsável por fazer as chamadas aos endpoints
 */
@Injectable({
  providedIn: 'root'
})
export class JogoApiService {

  /**
   * Url do serviço
   */
  private apiUrl = 'https://salty-tor-81757.herokuapp.com';

  constructor(private http: HttpClient) { }

  /**
   * Cria um novo jogo
   * @param jogo jogo a ser criado
   */
  criarJogo(jogo: Jogo): Observable<{ game: Jogo, questions: Pergunta[] }> {
    return this.http.post<{ game: Jogo, questions: Pergunta[] }>(`${this.apiUrl}/games`, { game: jogo }).pipe(
      catchError(this.retornarDadoPadraoEmCasoDeErro(null))
    );
  }

  /**
   * Atualiza o estado de um jogo existente
   * @param jogo jogo a ser atualizado
   */
  atualizarJogo(jogo: Jogo): Observable<Jogo> {
    return this.http.put<Jogo>(`${this.apiUrl}/games/${jogo.id}`, { game: jogo }).pipe(
      catchError(this.retornarDadoPadraoEmCasoDeErro(null))
    );
  }

  /**
   * Responde uma pergunta do jogo
   * @param pergunta_id id da pergunta ser respondida
   * @param resposta_id id da resposta enviada pelo jogador
   */
  responderPergunta(pergunta_id: string, resposta_id: number): Observable<{ correta: boolean, idCorreta: number }> {
    return this.http
      .post<{ correta: boolean, idCorreta: number }>(`${this.apiUrl}/questions/answer/${pergunta_id}/${resposta_id}`, {}).pipe(
        catchError(this.retornarDadoPadraoEmCasoDeErro(null)),
        map((resposta) => ({ correta: resposta.correct, idCorreta: resposta.correct_answer_id }))
      );
  }

  /**
   * Retorna um dado padrão para continuação do fluxo do Observable em caso de erro no request
   * @param dadoPadrao dado a ser retornado
   */
  private retornarDadoPadraoEmCasoDeErro<T>(dadoPadrao: T) {
    return () => of(dadoPadrao);
  }
}
