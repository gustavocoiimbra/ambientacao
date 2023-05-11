import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users.interface';
import { Observable } from 'rxjs';
import { Pessoas } from '../models/pessoa.interface';


@Injectable({
  providedIn: 'root'
})
export class ConsultaAPIService {

  private readonly API = "/pessoa";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(this.API);
  }

  public loadById(id: string): Observable<Pessoas> {
    return this.httpClient.get<Pessoas>(`${this.API}/${id}`);
  }

  public saveData(newPessoa: Pessoas): Observable<Pessoas> {
    if(newPessoa.id) {
      return this.update(newPessoa);
    }
    return this.create(newPessoa);
  }

  private create(newPessoa: Partial<Pessoas>): Observable<Pessoas> {
    console.log(this.httpClient.post<Pessoas>(this.API, newPessoa));
    return this.httpClient.post<Pessoas>(this.API, newPessoa);
  }

  private update(newPessoa: Partial<Pessoas>): Observable<Pessoas> {
    return this.httpClient.put<Pessoas>(`${this.API}/${newPessoa.id}`, newPessoa);
  }

  public delete(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
