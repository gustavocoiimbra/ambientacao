import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaRoutingModule } from './tabela-routing.module';
import { TabelaComponent } from './tabela/tabela.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,
    TabelaRoutingModule,
    AppMaterialModule
  ]
})
export class TabelaModule { }
