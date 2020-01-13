import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaApresentacaoComponent } from './tela-apresentacao.component';

describe('TelaApresentacaoComponent', () => {
  let component: TelaApresentacaoComponent;
  let fixture: ComponentFixture<TelaApresentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaApresentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaApresentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
