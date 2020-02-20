import { Pergunta } from './pergunta';

/**
 * Representa o Jogo com perguntas respondidas,
 * nome do jogador e pontos conquistados
 */
export class Jogo {
    public id: string;
    public player_name: string;
    public score = 0;
    public questions: Pergunta[] = [];

    constructor(nomeJogador: string) {
        this.player_name = nomeJogador;
    }
}
