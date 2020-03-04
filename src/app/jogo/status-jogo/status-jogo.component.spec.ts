import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusJogoComponent } from './status-jogo.component';
import { StatusJogoService } from '../services/status-jogo.service';

fdescribe('StatusJogoComponent', () => {
  let statusJogoServiceSpy: jasmine.SpyObj<StatusJogoService>;

  let component: StatusJogoComponent;
  let fixture: ComponentFixture<StatusJogoComponent>;

  beforeEach(() => {
    const statusService = jasmine.createSpyObj('StatusJogoService', ['atualizaStatus']);

    TestBed.configureTestingModule({
      declarations: [StatusJogoComponent],
      providers: [
        { provide: StatusJogoService, useValue: statusService }
      ]
    });

    statusJogoServiceSpy = TestBed.get(StatusJogoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusJogoComponent);
    component = fixture.componentInstance;
  });

  it('#atualizaStatus deve atualizar estado do componente', () => {
    const randomNumber = () => (Math.random() * 100).toFixed(0);
    const novoEstadoStub = {
      errar: randomNumber(),
      parar: randomNumber(),
      acertar: randomNumber()
    };
    statusJogoServiceSpy.atualizaStatus.and.returnValue(novoEstadoStub);

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent)
      .toContain(`Errar ${novoEstadoStub.errar} | Parar ${novoEstadoStub.parar} | Acertar ${novoEstadoStub.acertar}`);
  });
});
