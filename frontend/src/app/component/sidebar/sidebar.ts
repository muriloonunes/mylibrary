import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
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
  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      this.modoEscuro = true;
      document.documentElement.classList.add('app-dark');
    }
  }

  private router = inject(Router)

  colapsada: boolean = false;
  modoEscuro: boolean = false;

  itensMenu = [
    {label: 'Categorias', icon: 'pi pi-tags', rota: '/categorias'},
  ]

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

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }
}
