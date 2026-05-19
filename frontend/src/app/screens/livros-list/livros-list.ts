import { Component } from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-livros-list',
    imports: [
        Button
    ],
  templateUrl: './livros-list.html',
  styleUrl: './livros-list.css',
})
export class LivrosList {}
