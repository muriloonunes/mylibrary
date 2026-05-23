import { Routes } from '@angular/router';
import { CategoriasList } from './screens/categorias-list/categorias-list';
import { LivrosList } from './screens/livros-list/livros-list';
import { EmprestimosList } from './screens/emprestimos-list/emprestimos-list';
import {EmprestimosCadastro} from './screens/emprestimos-cadastro/emprestimos-cadastro';
import {Dashboard} from './screens/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Dashboard },
  { path: 'livros', component: LivrosList },
  { path: 'categorias', component: CategoriasList },
  { path: 'emprestimos', component: EmprestimosList },
  { path: 'emprestimos/novo', component: EmprestimosCadastro },
];
