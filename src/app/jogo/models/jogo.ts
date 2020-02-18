import { Pergunta } from './pergunta';

export class Jogo {
    public id: string;
    public _player_name: string;
    public _score = 0;
    public _questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this._player_name = nomeJogador;
    }
}
