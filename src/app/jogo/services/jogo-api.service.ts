import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../models/jogo';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pergunta } from '../models/pergunta';

@Injectable({
  providedIn: 'root'
})
export class JogoApiService {

  private apiUrl = 'https://salty-tor-81757.herokuapp.com';

  constructor(private http: HttpClient) { }

  criarJogo(jogo: Jogo): Observable<{ game: Jogo, questions: Pergunta[] }> {
    return this.http.post<{ game: Jogo, questions: Pergunta[] }>(`${this.apiUrl}/games`, { game: jogo }).pipe(
      catchError((_) => {
        return of(null);
      })
    );
  }

  atualizarJogo(jogo: Jogo): Observable<Jogo> {
    return this.http.put<Jogo>(`${this.apiUrl}/games/${jogo.id}`, { game: jogo }).pipe(
      catchError((_) => {
        return of(null);
      })
    );
  }

  responderPergunta(pergunta_id: string, resposta_id: number): Observable<{ correta: boolean, idCorreta: number }> {
    return this.http.post<boolean>(`${this.apiUrl}/questions/answer/${pergunta_id}/${resposta_id}`, {}).pipe(
      catchError((_) => {
        return null;
      }),
      map((answer: any) => ({ correta: answer.correct, idCorreta: answer.correct_answer_id }))
    );
  }
}
