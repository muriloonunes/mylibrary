import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimosCadastro } from './emprestimos-cadastro';

describe('EmprestimosCadastro', () => {
  let component: EmprestimosCadastro;
  let fixture: ComponentFixture<EmprestimosCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimosCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
