import { ListagemFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';

const routes: Routes = [
  {
    path: 'categorias/listagemcategorias', component: ListagemCategoriasComponent
  },
  {
    path: 'categorias/novacategorias', component: NovaCategoriaComponent
  },
  {
    path: 'categorias/atualizarcategoria/:id', component: AtualizarCategoriaComponent
  },

  {
    path: 'funcoes/listagemfuncoes', component: ListagemFuncoesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
