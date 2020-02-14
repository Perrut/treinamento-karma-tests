import { Resposta } from './resposta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
export class Pergunta {
    public id: string;
    public _question: string;
    public answers: Resposta[];
    public _level: DificuldadePergunta;
}
