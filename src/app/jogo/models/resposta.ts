import { EstadoResposta } from '../enums/estado-resposta';

// tslint:disable: variable-name
export class Resposta {
    // TODO: remover id dinâmico, obter do backend
    private _id: string = Math.floor(Math.random() * 4) as unknown as string;
    private _conteudo: string;
    private _estadoResposta: EstadoResposta = EstadoResposta.NAO_RESPONDIDA;

    constructor(conteudo: string) {
        this._conteudo = conteudo;
    }

    get id(): string {
        return this._id;
    }

    get conteudo(): string {
        return this._conteudo;
    }

    set conteudo(conteudo: string) {
        this._conteudo = conteudo;
    }

    get estadoResposta(): EstadoResposta {
        return this._estadoResposta;
    }

    set estadoResposta(estadoResposta: EstadoResposta) {
        this._estadoResposta = estadoResposta;
    }
}
