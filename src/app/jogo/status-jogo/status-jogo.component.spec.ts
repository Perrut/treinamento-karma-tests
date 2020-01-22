import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusJogoComponent } from './status-jogo.component';

describe('StatusJogoComponent', () => {
  let component: StatusJogoComponent;
  let fixture: ComponentFixture<StatusJogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusJogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
