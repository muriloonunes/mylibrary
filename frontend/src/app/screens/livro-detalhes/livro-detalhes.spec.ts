import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDetalhes } from './livro-detalhes';

describe('LivroDetalhes', () => {
  let component: LivroDetalhes;
  let fixture: ComponentFixture<LivroDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroDetalhes],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroDetalhes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
