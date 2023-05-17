import { TestBed } from '@angular/core/testing';

import { ConsultaAPIService } from './consulta-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Users } from '../models/users.interface';
import { Pessoas } from '../models/pessoa.interface';

const mockData: Users = {
  "_embedded": {
    "pessoas": [
      {
        "id": "1",
        "cpf": "06616006107",
        "name": "Lucas Silva Amaral",
      },
      {
        "id": "2",
        "cpf": "86495470100",
        "name": "Pedro Souza Silva",
      }
    ]
  },
  "_links": {
    "profile": "http://localhost:8080/profile/pessoa",
    "search": "http://localhost:8080/pessoa/search",
    "self": "http://localhost:8080/pessoa"
    
  },
  "page": {
    "size": 20,
    "totalElements": 2,
    "totalPage": 1,
    "number": 0
  }
}

const mockPessoa: Pessoas = {
  id: '1',
  name: 'Lucas Silva Amaral',
  cpf: '06616006107'
}

describe('ConsultaAPIService', () => {
  let http: HttpClient;
  let service: ConsultaAPIService;
  let httpTestingController: HttpTestingController;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
     imports: [
      HttpClientTestingModule
    ]}).compileComponents();

    service = TestBed.inject(ConsultaAPIService);
    httpTestingController = TestBed.inject(HttpTestingController);


    expect(spyOn(service, 'getUsers').and.returnValue(of(mockData))).toBeTruthy();
});

  afterEach(() => { 
    httpTestingController.verify(); 
  }); 

  it('should be created', () => {
    let service: ConsultaAPIService = new ConsultaAPIService(http);
    expect(service).toBeTruthy();
  });

  it('Deve retornar os todos os usuários', () => {
    
    service.getUsers().subscribe(resposta => {
      let nomePessoas = resposta._embedded.pessoas.flatMap(
        i => i.name
      );
      let cpfPessoas = resposta._embedded.pessoas;
      expect(resposta).toEqual(mockData);
      expect(cpfPessoas.length === mockData._embedded.pessoas.length).toBeTrue();
      expect(nomePessoas[1] === mockData._embedded.pessoas[1].name).toBeTrue();
    });

    httpTestingController.verify();
  });

  it('Consulta deve retornar um usuário específico', () => {
    
    service.loadById('1').subscribe(resposta => {
      let pessoas = mockPessoa;
      expect(pessoas.name === resposta.name).toBeTrue();
      expect(pessoas.id === resposta.id).toBeTrue();
      expect(pessoas.cpf != resposta.cpf).toBeFalse();
    });

    const req = httpTestingController.expectOne('/pessoa/1');
    expect(req.request.method).toEqual('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockPessoa);
    httpTestingController.verify();
  });

  it('Consulta deve criar um objeto específico', () => {
    const mockSave: Pessoas = {
      "id": null,
      "name": "João Pedro",
      "cpf": "06616006107"
    };

    service.saveData(mockSave).subscribe(
      resposta => {
        expect(resposta.name).toBe("João Pedro");
      });

      const req = httpTestingController.expectOne('/pessoa');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toBe(mockSave);
      expect(req.request.responseType).toEqual('json');
      req.flush(mockSave);
      httpTestingController.verify();
  }); 

  it('Consulta deve excluir um registro específico', () => {
    service.delete('2').subscribe(res => 
      expect(res).toBe(1)
      );

    const req = httpTestingController.expectOne('/pessoa/2');
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.responseType).toEqual('json');
    expect(req.cancelled).toBeFalsy(); 
    req.flush(1);
    httpTestingController.verify();
  });

  it('Consulta deve retornar um update de um registro específico', () => {
    const mockSave: Pessoas = {
      "id": '1',
      "name": "Pedro Paulo Oliveira",
      "cpf": "06616006107"
    };
    service.saveData(mockSave).subscribe(resposta => {
      expect(resposta.name).toBe('Pedro Paulo Oliveira');
      expect(resposta.cpf).toBe('06616006107');
    });

    const req = httpTestingController.expectOne('/pessoa/1');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(mockSave);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockSave);
    httpTestingController.verify();
  })

  it('Consulta deve retornar um erro 404', () => {

  })

});