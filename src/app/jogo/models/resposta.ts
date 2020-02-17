import { EstadoResposta } from '../enums/estado-resposta';

export class Resposta {
    public id: number;
    public _content: string;
    public _estadoResposta: EstadoResposta = EstadoResposta.NAO_RESPONDIDA;

    constructor(conteudo: string) {
        this._content = conteudo;
    }
}
