import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaRoutingModule } from './tabela-routing.module';
import { TabelaComponent } from './tabela/tabela.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,
    TabelaRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class TabelaModule { }
