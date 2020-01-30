import { Pergunta } from './pergunta';

// tslint:disable: variable-name
export class Jogo {
    public id: string;
    public _player_name: string;
    public _score = 0;
    public _questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this._player_name = nomeJogador;
    }

    public adicionarPerguntaRespondida(pergunta: Pergunta): void {
        this._questions.push(pergunta);
    }
}
