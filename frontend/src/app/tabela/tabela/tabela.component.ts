import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  public dataUsers: Users[] = [ 
    { _id: '1', name: 'Lucas', cpf: '123456789'}
  ];
  displayedColumns = ['name', 'cpf'];


  constructor() { }

  ngOnInit(): void {
  }

}
