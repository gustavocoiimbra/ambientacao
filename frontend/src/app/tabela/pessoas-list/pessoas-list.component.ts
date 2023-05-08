import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Users } from 'src/app/models/users.interface';


@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements OnInit {

  @Input() public data: Users[] = [];
  @Output() public add = new EventEmitter(false);
  @Output() public edit = new EventEmitter(false);
  public displayedColumns = ['name', 'cpf', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  public onAdd() {
    this.add.emit(true);
  }

  public onEdit(data: Users) {
    this.edit.emit(data);
  }

}
