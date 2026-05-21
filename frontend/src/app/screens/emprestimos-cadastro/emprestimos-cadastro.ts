import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {LivroService} from '../../services/livro-service/livro-service';
import {LivroModel} from '../../models/livro.model';
import {EmprestimoService} from '../../services/emprestimo-service/emprestimo-service';
import {EmprestimoCadastroModel} from '../../models/emprestimo.model';
import {Button} from 'primeng/button';
import {Toast} from 'primeng/toast';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass} from '@angular/common';
import {InputMask, InputMaskDirective} from 'primeng/inputmask';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-emprestimos-cadastro',
  imports: [
    Button,
    Toast,
    FormsModule,
    NgClass,
    InputMask,
    InputText,
    DatePicker,
    InputMaskDirective,
    AutoComplete,
    PrimeTemplate,
    Tooltip
  ],
  providers: [MessageService],
  templateUrl: './emprestimos-cadastro.html',
  styleUrl: './emprestimos-cadastro.css',
})
export class EmprestimosCadastro implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private cd = inject(ChangeDetectorRef);
  private livroService = inject(LivroService);
  private emprestimoService = inject(EmprestimoService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;

  livrosDisponiveis: LivroModel[] = [];
  livrosFiltrados: LivroModel[] = [];
  dataAtual = new Date();
  novoEmprestimo: EmprestimoCadastroModel = {
    livroId: null,
    pessoaNome: '',
    telefone: '',
    dataEmprestimo: this.dataAtual,
    dataPrevista: null,
  };
  erroBackend: string | null = null;

  ngOnInit(): void {
    this.carregarLivros();
  }

  salvarEmprestimo() {
    if (!this.novoEmprestimo) return;
    if (!this.cadastroForm?.valid) return;

    this.erroBackend = null;

    const dadosParaEnviar = {
      ...this.novoEmprestimo,
      telefone: this.novoEmprestimo.telefone.replace(/\D/g, '')
    };

    console.log(dadosParaEnviar);
  }

  protected carregarLivros() {
    this.livroService.obterLivrosDisponiveis().subscribe({
      next: (livros) => {
        console.log(livros);
        this.livrosDisponiveis = livros;
        this.livrosFiltrados = [...livros];
        this.cd.markForCheck();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao carregar livros: ${err.name}`,
        })
        console.error('Erro ao carregar livros:', err);
      }
    });
  }

  protected filtrarLivros(event: AutoCompleteCompleteEvent) {
    const busca = event.query.toLowerCase();
    this.livrosFiltrados = this.livrosDisponiveis.filter(livro =>
      livro.titulo.toLowerCase().includes(busca) ||
      livro.autor.toLowerCase().includes(busca)
    );
  }
}
