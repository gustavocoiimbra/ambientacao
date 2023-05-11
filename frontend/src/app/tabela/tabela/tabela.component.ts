import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';
import { ConsultaAPIService } from 'src/app/services/consulta-api.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  public dataUsers!: Observable<Users[]>;
  public listUsers: MatTableDataSource<Users> = new MatTableDataSource();
  public displayedColumns = ['name', 'cpf', 'actions'];

  constructor(
    private dataUserService: ConsultaAPIService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  
  public ngOnInit(): void {
    this.refresh();
  }

  public onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
      });
  }

  public onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  public onEdit(data: Users): void {
    this.router.navigate(['edit', data.id], {relativeTo: this.route});
  }

  public onDelete(data: Users): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.dataUserService.delete(data.id).subscribe(
          () => this.refresh()
        );
      }
    });
  }

  public refresh(): void {
    this.dataUsers = this.dataUserService.getUsers().pipe(
      catchError(() => {
        this.onError('Erro ao carregar os usuários.')
        return of([])
      }));
  }
}
