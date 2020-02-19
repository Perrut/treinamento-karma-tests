import { Resposta } from './resposta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

export class Pergunta {
    public id: string;
    public question: string;
    public answers: Resposta[] = [];
    public level: DificuldadePergunta;
}
