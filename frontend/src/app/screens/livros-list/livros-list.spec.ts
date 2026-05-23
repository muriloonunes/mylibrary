import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosList } from './livros-list';

describe('LivrosList', () => {
  let component: LivrosList;
  let fixture: ComponentFixture<LivrosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosList],
    }).compileComponents();

    fixture = TestBed.createComponent(LivrosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
