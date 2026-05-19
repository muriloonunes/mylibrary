import {Routes} from '@angular/router';
import {CategoriasList} from './screens/categorias-list/categorias-list';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'categorias', component: CategoriasList},
];
