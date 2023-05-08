import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ 
    ErrorDialogComponent,
    DialogComponent
  ]
})
export class SharedModule { }
