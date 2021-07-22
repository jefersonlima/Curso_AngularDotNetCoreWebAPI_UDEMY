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

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe(resultado => {
      this.categorias.data = resultado;
    });

    this.displayedColumns = this.ExibirColunas();
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
