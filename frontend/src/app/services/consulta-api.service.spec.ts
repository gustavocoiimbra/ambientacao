import { TestBed } from '@angular/core/testing';

import { ConsultaAPIService } from './consulta-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { HttpClient } from '@angular/common/http';
import { Pessoas } from '../models/pessoa.interface';


fdescribe('ConsultaAPIService', () => {
  let service: ConsultaAPIService;
 // let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [
      HttpClientTestingModule
    ]}).compileComponents();

    service = TestBed.inject(ConsultaAPIService);
   // http = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('Consulta ', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getUsers();
    expect(spy).toHaveBeenCalledWith('/api/pessoas');
  });*/

  it('Consulta deve retornar uma lista de usuários', () => {
    const listPessoas: Pessoas[] = [{
      "id": "1",
      "name": "Lucas",
      "cpf": "12345678900",
    }, 
    {
      "id": "2",
      "name": "Douglas",
      "cpf": "74125896300"
    }];
    
    expect(service.getUsers().subscribe(
      resposta =>  { console.log(resposta);
        expect(resposta._embedded.pessoas[1].name).toEqual(listPessoas[1].id)
  })).toBeTruthy();
  });

  it('Consulta deve retornar um usuário específico', () => {
    const userConsulta: Pessoas = {
      "id": "1",
      "name": "Lucas",
      "cpf": "12345678900"
    };

    expect(service.loadById(userConsulta.id).subscribe(
      resposta => {
        expect(resposta.id).toEqual(userConsulta.id);
        expect(resposta.name).toEqual(userConsulta.name);
        expect(resposta.cpf).toEqual(userConsulta.cpf);
      })).toBeTruthy();
  });

});


