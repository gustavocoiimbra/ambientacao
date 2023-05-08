import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaComponent } from './tabela/tabela.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PessoasResolver } from './guards/pessoas.resolver';

const routes: Routes = [
  { path: '', component: TabelaComponent },
  { path: 'new', component: FormularioComponent, resolve: { pessoas: PessoasResolver} },
  { path: 'edit/:id', component: FormularioComponent, resolve: { pessoas: PessoasResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelaRoutingModule { }
