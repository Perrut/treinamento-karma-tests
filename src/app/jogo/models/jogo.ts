import { Pergunta } from './pergunta';

// tslint:disable: variable-name
export class Jogo {
    private id: string;
    private _player_name: string;
    private _score = 0;
    private _questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this.nomeJogador = nomeJogador;
    }

    getId(): string {
        return this.id;
    }

    get nomeJogador(): string {
        return this._player_name;
    }

    set nomeJogador(nomeJogador: string) {
        this._player_name = nomeJogador;
    }

    get pontos(): number {
        return this._score;
    }

    set pontos(pontos: number) {
        this._score = pontos;
    }

    get perguntasRespondidas(): Pergunta[] {
        return this._questions;
    }

    public adicionarPerguntaRespondida(pergunta: Pergunta): void {
        this._questions.push(pergunta);
    }
}
