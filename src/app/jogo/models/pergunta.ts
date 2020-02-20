import { Resposta } from './resposta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

/**
 * Representação de uma pergunta do jogo,
 * com 4 respostas possíveis e um nível de dificuldade
 */
export class Pergunta {
    public id: string;
    public question: string;
    public answers: Resposta[] = [];
    public level: DificuldadePergunta;
}
