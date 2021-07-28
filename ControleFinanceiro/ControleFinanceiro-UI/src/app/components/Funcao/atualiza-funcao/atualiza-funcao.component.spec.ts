import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaFuncaoComponent } from './atualiza-funcao.component';

describe('AtualizaFuncaoComponent', () => {
  let component: AtualizaFuncaoComponent;
  let fixture: ComponentFixture<AtualizaFuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizaFuncaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizaFuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
