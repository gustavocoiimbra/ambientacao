import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';
import { ConsultaAPIService } from 'src/app/services/consulta-api.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoas } from 'src/app/models/pessoa.interface';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  public dataUsers!: Observable<Users>;
  public listUsers: MatTableDataSource<Users> = new MatTableDataSource();
  public displayedColumns = ['name', 'cpf', 'actions'];

  constructor(
    private consultaService: ConsultaAPIService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  
  public ngOnInit(): void {
    this.carregarPessoas();
  }

  public onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
      });
  }

  public onAdd(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  public onEdit(data: Pessoas): void {
    this.router.navigate(['edit', data.id], {relativeTo: this.route});
  }

  public onDelete(data: Pessoas): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.consultaService.delete(data.id!).subscribe(
          () => this.carregarPessoas()
        );
    }});
  }

  public carregarPessoas(): void {
    this.dataUsers = this.consultaService.getUsers().pipe(
        catchError(() => {
          this.onError('Erro ao carregar cursos.');
          return of()
        })
    );
  }
}
