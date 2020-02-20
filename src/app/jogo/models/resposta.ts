import { EstadoResposta } from '../enums/estado-resposta';

/**
 * Resposta à uma pergunta do jogo
 */
export class Resposta {
    public id: number;
    public content: string;
    public estadoResposta: EstadoResposta = EstadoResposta.NAO_RESPONDIDA;

    constructor(conteudo: string) {
        this.content = conteudo;
    }
}
