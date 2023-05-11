import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users.interface';

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements AfterViewInit, OnInit {

  @Input() public data: Users[] = [];
  @Output() public add = new EventEmitter(false);
  @Output() public edit = new EventEmitter(false);
  @Output() public delete = new EventEmitter(false);
  
  public displayedColumns = ['name', 'cpf', 'actions'];
  public datas: MatTableDataSource<Users> = new MatTableDataSource;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.datas = new MatTableDataSource(this.data);    
  }

  ngAfterViewInit(): void {
    this.datas.sort = this.sort;
    this.datas.paginator = this.paginator;   
  }

  public onAdd() {
    this.add.emit(true);
  }

  public onEdit(data: Users) {
    this.edit.emit(data);
  }

  public onDelete(data: Users) {
    this.delete.emit(data);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datas.filter = filterValue.trim().toLowerCase();

    if (this.datas.paginator) {
      this.datas.paginator.firstPage();
    }
  }
}