import { Pergunta } from './pergunta';

export class Jogo {
    public id: string;
    public player_name: string;
    public score = 0;
    public questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this.player_name = nomeJogador;
    }
}
