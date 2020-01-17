import { Resposta } from './resposta';

// tslint:disable: variable-name
export class Pergunta {
    // TODO: remover id dinâmico, obter do backend
    private _id: string = Math.floor(Math.random() * 500) as unknown as string;
    private _pergunta: string;
    private _respostas: Resposta[];

    constructor(pergunta: string, respostas: Resposta[]) {
        this._pergunta = pergunta;
        this._respostas = respostas;
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
}
