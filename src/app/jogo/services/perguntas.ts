import { Pergunta } from '../models/pergunta';
import { Resposta } from '../models/resposta';

export const perguntas: { pergunta: Pergunta, resposta: number }[] = [
    {
        pergunta:
            new Pergunta('pergunta 1',
                [
                    new Resposta('resposta 1'),
                    new Resposta('resposta 2'),
                    new Resposta('resposta 3'),
                    new Resposta('resposta 4'),
                ]),
        resposta: Math.floor((Math.random() * 4))
    },
    {
        pergunta:
            new Pergunta('pergunta 2',
                [
                    new Resposta('resposta 1'),
                    new Resposta('resposta 2'),
                    new Resposta('resposta 3'),
                    new Resposta('resposta 4'),
                ]),
        resposta: Math.floor((Math.random() * 4))
    },
    {
        pergunta:
            new Pergunta('pergunta 3',
                [
                    new Resposta('resposta 1'),
                    new Resposta('resposta 2'),
                    new Resposta('resposta 3'),
                    new Resposta('resposta 4'),
                ]),
        resposta: Math.floor((Math.random() * 4))
    },
];
