import { StatusJogoService } from './status-jogo.service';
import { JogoService } from './jogo.service';
import { Pergunta } from '../models/pergunta';
import { Jogo } from '../models/jogo';

fdescribe('StatusJogoService', () => {
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
    const stubProximaPergunta = new Pergunta();
    stubProximaPergunta.id = 'id-proxima-pergunta';
    jogoServiceSpy.verificaProximaPergunta.and.returnValue(stubProximaPergunta);

    const stubValorPergunta = 1000;
    jogoServiceSpy.getValorPergunta.and.returnValue(stubValorPergunta);

    const novoStatus = service.atualizaStatus({ errar: '0', parar: '1000', acertar: '0' });

    expect({ errar: '500', parar: '1000', acertar: '2000' }).toEqual(novoStatus);
  });

  it('#atualizaStatus deve atualizar status quando não houver próxima pergunta', () => {
    jogoServiceSpy.verificaProximaPergunta.and.returnValue(null);

    const stubValorPergunta = 10000;
    jogoServiceSpy.getValorPergunta.and.returnValue(stubValorPergunta);

    const novoStatus = service.atualizaStatus({ errar: '0', parar: '1000', acertar: '0' });

    expect({ errar: '0', parar: '1000', acertar: '10000' }).toEqual(novoStatus);
  });
});
