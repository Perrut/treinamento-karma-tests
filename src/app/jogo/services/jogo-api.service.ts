import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../models/jogo';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogoApiService {

  private apiUrl = 'https://salty-tor-81757.herokuapp.com';

  constructor(private http: HttpClient) { }

  criarJogo(jogo: Jogo): Observable<Jogo> {
    return this.http.post<Jogo>(`${this.apiUrl}/games`, { game: jogo }).pipe(
      catchError((_) => {
        return null;
      }),
      map((game) => (game as Jogo))
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
