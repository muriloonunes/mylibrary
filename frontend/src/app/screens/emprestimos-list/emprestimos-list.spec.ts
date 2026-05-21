import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimosList } from './emprestimos-list';

describe('EmprestimosList', () => {
  let component: EmprestimosList;
  let fixture: ComponentFixture<EmprestimosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
