import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    Button,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  itensMenu = [
    {label: 'Livros', icon: 'pi pi-book', rota: '/livros'},
    {label: 'Categorias', icon: 'pi pi-tags', rota: '/categorias'},
  ]
  colapsada: boolean = false;
  modoEscuro: boolean = false;

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      this.modoEscuro = true;
      document.documentElement.classList.add('app-dark');
    }
  }

  toggleColapsada() {
    this.colapsada = !this.colapsada;
  }

  toggleTema() {
    this.modoEscuro = !this.modoEscuro;

    if (this.modoEscuro) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }
}
