import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  public save?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userSerice: UsersService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) {

    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      cpf: [null, [Validators.required]]
    });

   }

   public onSubmit() {
    if(!this.form.invalid) {
      this.userSerice.saveData(this.form.value).subscribe(
        result => {
          console.log(result), console.log(this.form.value)},
        error => console.log(error)
      );
      this.onCancel();
    }
   }

   public onCancel() {
    this.location.back();
   }

   public activateSnackBar(erro: any) {

    if(erro == "") {
      this.snackBar.open('Erro ao salvar usuário!', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
    this.snackBar.open('Registro salvo com sucesso', 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
   }

   public getErrorMessage(name: string) {
      const field = this.form.get(name);
      
      if(field?.hasError('requiered')) {
        return 'Campo obrigatório';
      }
      return 'Campo obrigatório não preenchido';
   }

  ngOnInit(): void {

    const user: Users = this.route.snapshot.data['pessoas'];
    this.form.setValue({
      id: user.id,
      name: user.name,
      cpf: user.cpf
    })
  }

}
