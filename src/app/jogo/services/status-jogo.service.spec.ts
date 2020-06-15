import { StatusJogoService } from './status-jogo.service';
import { JogoService } from './jogo.service';
import { Pergunta } from '../models/pergunta';
import { Jogo } from '../models/jogo';

describe('StatusJogoService', () => {
  let jogoServiceSpy: jasmine.SpyObj<JogoService>;
  let service: StatusJogoService;

  beforeEach(() => {
    jogoServiceSpy = jasmine
      .createSpyObj('JogoService',
        ['getJogo', 'getValorPergunta',
          'getPerguntaAtual', 'verificaProximaPergunta']);

    const stubPerguntAtual = new Pergunta();
    stubPerguntAtual.id = 'id-pergunta-atual';
    jogoServiceSpy.getPerguntaAtual.and.returnValue(stubPerguntAtual);

    const stubJogo = new Jogo('NomeJogador');
    stubJogo.score = 1000;
    jogoServiceSpy.getJogo.and.returnValue(stubJogo);

    service = new StatusJogoService(jogoServiceSpy);
  });

  it('#atualizaStatus deve atualizar status quando houver próxima pergunta', () => {

  });
});
