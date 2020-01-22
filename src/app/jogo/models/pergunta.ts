import { Resposta } from './resposta';
import { DificuldadePergunta } from '../enums/dificuldade-pergunta';

// tslint:disable: variable-name
export class Pergunta {
    // TODO: remover id dinâmico, obter do backend
    private _id: string = Math.floor(Math.random() * 500) as unknown as string;
    private _pergunta: string;
    private _respostas: Resposta[];
    private _dificuldade: DificuldadePergunta;
    private _valor: number;

    constructor(pergunta: string, respostas: Resposta[], dificuldade: DificuldadePergunta) {
        this._pergunta = pergunta;
        this._respostas = respostas;
        this._dificuldade = dificuldade;
    }

    get id(): string {
        return this._id;
    }

    get pergunta(): string {
        return this._pergunta;
    }

    set pergunta(pergunta: string) {
        this._pergunta = pergunta;
    }

    get respostas(): Resposta[] {
        return this._respostas;
    }

    set respostas(respostas: Resposta[]) {
        this._respostas = respostas;
    }

    get dificuldadePergunta(): DificuldadePergunta {
        return this._dificuldade;
    }

    set dificuldadePergunta(dificuldade: DificuldadePergunta) {
        this._dificuldade = dificuldade;
    }

    get valor(): number {
        switch (this._dificuldade) {
            case DificuldadePergunta.FACIL:
                return 1000;
            case DificuldadePergunta.MEDIO:
                return 10000;
            case DificuldadePergunta.DIFICIL:
                return 100000;
            case DificuldadePergunta.MUITO_DIFICIL:
                return 1000000;
        }
    }
}
