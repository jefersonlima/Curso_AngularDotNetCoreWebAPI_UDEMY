import { AtualizarCategoriaComponent } from './components/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NovaCategoriaComponent } from './components/Categoria/nova-categoria/nova-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCategoriasComponent } from './components/Categoria/listagem-categorias/listagem-categorias.component';

const routes: Routes = [
  {
    path: 'categoria/listagemcategorias', component: ListagemCategoriasComponent
  },
  {
    path: 'categoria/novacategorias', component: NovaCategoriaComponent
  },
  {
    path: 'categoria/atualiarcategoria/:id', component: AtualizarCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
