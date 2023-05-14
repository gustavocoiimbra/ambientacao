import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CpfPipe } from './pipes/cpf.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    DialogComponent,
    ProfileComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ 
    ErrorDialogComponent,
    DialogComponent,
    ProfileComponent,
    CpfPipe
  ]
})
export class SharedModule { }
