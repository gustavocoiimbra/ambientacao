import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaAPIService } from 'src/app/services/consulta-api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ValidarCpf } from 'src/app/models/validar-cpf';
import { Pessoas } from 'src/app/models/pessoa.interface';
import { TabelaComponent } from '../tabela/tabela.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public form: FormGroup;
  public refresh!: TabelaComponent;

  constructor(
    private formBuilder: FormBuilder,
    private consultaService: ConsultaAPIService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) {

  this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      cpf: [null, Validators.compose([Validators.required, ValidarCpf.cpf])]
    });
  }

  public ngOnInit(): void {
    const user: Pessoas = this.route.snapshot.data['pessoas'];
    this.form.setValue({
      id: user.id,
      name: user.name,
      cpf: user.cpf
    })
  }

  public onSubmit(): void {
    if(!this.form.invalid) {
      this.consultaService.saveData(this.form.value).subscribe(
        () => {
          this.activateSnackBar(false);
        },
        () => this.activateSnackBar(true)); 
      this.onCancel();
      this.refresh.carregarPessoas();
    }
  }

  public onCancel(): void {
    this.location.back();
   }

  public activateSnackBar(erro: boolean): void {
    if(erro) {
      this.snackBar.open('Erro ao salvar usuário!', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    } else {
      this.snackBar.open("Registro salvo com sucesso!", "Fechar", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
  }

  public getErrorMessage(name: string) {
      const field = this.form.get(name);
  
      if((field?.hasError('requiered'))) {
        return 'Campo obrigatório' ;
      }
      return 'Campo obrigatório não preenchido ou dado inválido';
  }
}
