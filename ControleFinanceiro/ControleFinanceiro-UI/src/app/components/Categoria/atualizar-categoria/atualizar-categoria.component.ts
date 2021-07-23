import { FormControl, FormGroup } from '@angular/forms';
import { CategoriasService } from './../../../services/categorias.service';
import { TiposService } from './../../../services/tipos.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Tipo } from 'src/app/models/Tipo';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {

  nomeCategoria: string | undefined;
  categoriaId: number | undefined;
  categoria: Observable<Categoria> | undefined;
  tipos: Tipo[] | undefined;
  formulario: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.categoriaId = this.route.snapshot.params.id;
    this.tiposService.PegarTodos().subscribe(resultado => {
      this.tipos = resultado;
    });

    this.categoriasService.PegarCategoriaPeloId(this.categoriaId!).subscribe(resultado => {
      this.nomeCategoria = resultado.nome;
      this.formulario = new FormGroup({
        categoriaId: new FormControl(resultado.categoriaId),
        nome: new FormControl(resultado.nome),
        icone: new FormControl(resultado.icone),
        tipoId: new FormControl(resultado.tipoId)
      });
    });
  }
  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFornulario(): void {
    const categoria = this.formulario.value;
    this.categoriasService.AtualizarCategoria(this.categoriaId!, categoria).subscribe(resultado => {
      this.router.navigate(['categorias/listagemcategorias']);
      this.snackBar.open(resultado.mensagem, null!, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }

  VoltarListagem(): void {
    this.router.navigate(['categorias/listagemcategorias'])
  }
}
