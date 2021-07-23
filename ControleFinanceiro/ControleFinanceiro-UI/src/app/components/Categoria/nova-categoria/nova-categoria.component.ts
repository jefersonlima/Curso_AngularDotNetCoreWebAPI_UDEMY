import { CategoriasService } from './../../../services/categorias.service';
import { Categoria } from './../../../models/Categoria';
import { TiposService } from './../../../services/tipos.service';
import { Tipo } from './../../../models/Tipo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  formulario: any;
  tipos: Tipo[] | undefined;

  constructor(
    private tiposService: TiposService,
    private categoriasService: CategoriasService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tiposService.PegarTodos().subscribe(resultado => {
      this.tipos = resultado;
      console.log(resultado);
    });

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      icone: new FormControl(null),
      tipoId: new FormControl(null),
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const categoria = this.formulario.value;

    this.categoriasService.NovaCategoria(categoria).subscribe(resultado => {
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
