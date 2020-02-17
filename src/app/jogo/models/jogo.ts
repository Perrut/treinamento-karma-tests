import { Pergunta } from './pergunta';

export class Jogo {
    public id: string;
    public _player_name: string;
    public _score = 0;
    public questions: Pergunta[] = [];
    public _answered_questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this._player_name = nomeJogador;
    }

    public adicionarPerguntaRespondida(pergunta: Pergunta): void {
        this._answered_questions.push(pergunta);
    }
}
