import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaRoutingModule } from './tabela-routing.module';
import { TabelaComponent } from './tabela/tabela.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PessoasListComponent } from './pessoas-list/pessoas-list.component';

@NgModule({
  declarations: [
    TabelaComponent,
    FormularioComponent,
    PessoasListComponent
  ],
  imports: [
    CommonModule,
    TabelaRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TabelaModule { }
