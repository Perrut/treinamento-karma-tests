// tslint:disable: variable-name
export class Jogo {
    private _oid: string;
    private _nomeJogador: string;
    private _pontos = 0;
    private _perguntasRespondidas: string[] = [];

    constructor(nomeJogador: string) {
        this.nomeJogador = nomeJogador;
    }

    get oid(): string {
        return this._oid;
    }

    get nomeJogador(): string {
        return this._nomeJogador;
    }

    set nomeJogador(nomeJogador: string) {
        this._nomeJogador = nomeJogador;
    }

    get pontos(): number {
        return this._pontos;
    }

    set pontos(pontos: number) {
        this._pontos = pontos;
    }

    get perguntasRespondidas(): string[] {
        return this._perguntasRespondidas;
    }

    public adicionarPerguntaRespondida(idPergunta: string): void {
        this._perguntasRespondidas.push(idPergunta);
    }
}
