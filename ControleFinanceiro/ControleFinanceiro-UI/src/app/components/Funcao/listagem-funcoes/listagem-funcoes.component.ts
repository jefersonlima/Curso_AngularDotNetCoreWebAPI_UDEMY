import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FuncoesService } from './../../../services/funcoes.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listagem-funcoes',
  templateUrl: './listagem-funcoes.component.html',
  styleUrls: ['./listagem-funcoes.component.css']
})
export class ListagemFuncoesComponent implements OnInit {

  funcoes = new MatTableDataSource<any>()
  displayedColumns: string[] | undefined;
  autoCompleteInput = new FormControl;
  opcoesFuncoes: string[] = [];
  nomesFuncoes: Observable<string[]> | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  constructor(private funcoesService: FuncoesService) { }

  ngOnInit(): void {
    this.funcoesService.PegarTodos().subscribe(resultado => {
      resultado.forEach(funcao => {
        this.opcoesFuncoes.push(funcao.name!);
      });
      this.funcoes.data = resultado;
      this.funcoes.sort = this.sort!;
      this.funcoes.paginator = this.paginator!;
    });
    this.displayedColumns = this.ExibirColunas();

    this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.FiltrarNomes(nome)))
  }

  ExibirColunas(): string[] {
    return ['nome', 'descricao', 'acoes'];
  }

  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.funcoesService.FiltrarFuncoes(nome.toLowerCase()).subscribe(resultado => {
        this.funcoes.data = resultado;
      });
    } else {
      if (nome === '') {
        this.funcoesService.PegarTodos().subscribe((resultado) => {
          this.funcoes.data = resultado;
        });
      }
    }
    return this.opcoesFuncoes.filter((funcao) =>
      funcao.toLowerCase().includes(nome.toLowerCase()));
  }
}
