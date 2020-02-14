import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../models/jogo';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
        return null;
      }),
      map((response: any) => ({ game: response.game as Jogo, questions: response.questions as Pergunta[] }))
    );
  }

  atualizarJogo(jogo: Jogo): Observable<Jogo> {
    return this.http.put<Jogo>(`${this.apiUrl}/games/${jogo.id}`, { game: jogo }).pipe(
      catchError((_) => {
        return null;
      }),
      map((game) => (game as Jogo))
    );
  }
}
