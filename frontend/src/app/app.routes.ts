import { Routes } from '@angular/router';
import { CategoriasList } from './screens/categorias-list/categorias-list';
import { LivrosList } from './screens/livros-list/livros-list';
import { EmprestimosList } from './screens/emprestimos-list/emprestimos-list';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'livros', component: LivrosList },
  { path: 'categorias', component: CategoriasList },
  { path: 'emprestimos', component: EmprestimosList },
];
