import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriasService } from './../../../services/categorias.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css']
})
export class ListagemCategoriasComponent implements OnInit {

  //categoriaId: number | undefined;
  categorias = new MatTableDataSource<any>();
  displayedColumns: string[] | undefined;
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]> | undefined;

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe((resultado) => {
      resultado.forEach((categoria) => {
        this.opcoesCategorias.push(categoria.nome!);
      });
      this.categorias.data = resultado;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.FiltrarNomes(nome)));
  }

  ExibirColunas(): string[] {
    return ['nome', 'icone', 'tipo', 'acoes']
  }

  AbrirDialog(categoriaId: any, nome: any): void {
    this.dialog.open(DialogExclusaoCategoriasComponent, {
      data: {
        categoriaId: categoriaId,
        nome: nome
      }
    }).afterClosed().subscribe(resultado => {
      if (resultado === true) {
        this.categoriasService.PegarTodos().subscribe((dados) => {
          this.categorias.data = dados;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }
  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.categoriasService.FiltrarCategorias(nome.toLowerCase()).subscribe(resultado => {
        this.categorias.data = resultado;
      });
    }
    else {
      if (nome === '') {
        this.categoriasService.PegarTodos().subscribe(resultado => {
          this.categorias.data = resultado;
        });
      }
    }

    return this.opcoesCategorias.filter(categoria =>
      categoria.toLowerCase().includes(nome.toLowerCase())
    );
  }

}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categorias.html'
})
export class DialogExclusaoCategoriasComponent {
  constructor(@Inject(MAT_DIALOG_DATA)
  public dados: any,
    private categoriasService: CategoriasService) { }

  ExcluirCategoria(categoriaId: number): void {
    this.categoriasService.ExcluirCategoria(categoriaId).subscribe(resultado => {
    });
  }
}