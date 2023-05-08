import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  public dataUsers: Observable<Users[]>;
  displayedColumns = ['name', 'cpf', 'actions'];

  

  constructor(
    private dataUserService: UsersService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {

    this.dataUsers = this.dataUserService.getUsers().pipe(
      catchError(error => {
        console.log(error)
        this.onError('Erro ao carregar os usuários.')
        return of([])
      }));
   }

  public onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
      });
  }

  public onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  public onEdit(data: Users) {
    this.router.navigate(['edit', data.id], {relativeTo: this.route});
  }
 
  ngOnInit(): void {
    
  }

}
