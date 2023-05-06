import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  public dataUsers: Observable<Users[]>;
  displayedColumns = ['name', 'cpf'];

  

  constructor(
    private dataUserService: UsersService,
    public dialog: MatDialog
    ) {

    this.dataUsers = this.dataUserService.getUsers().pipe(
      catchError(error => {
        console.log(error)
        this.onError('Erro ao carregar os usuários.')
        return of([])
      }));
   }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
      });
  }

  ngOnInit(): void {
    
  }

}
