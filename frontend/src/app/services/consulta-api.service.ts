import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultaAPIService {

  private readonly API = "/api/pessoas";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.API)
  }

  public loadById(id: string): Observable<Users> {
    return this.httpClient.get<Users>(`${this.API}/${id}`);
  }

  public saveData(newPessoa: Users): Observable<Users> {
    if(newPessoa.id) {
      return this.update(newPessoa);
    }
    return this.create(newPessoa);
  }

  private create(newPessoa: Partial<Users>): Observable<Users> {
    return this.httpClient.post<Users>(this.API, newPessoa);
  }

  private update(newPessoa: Partial<Users>): Observable<Users> {
    return this.httpClient.put<Users>(`${this.API}/${newPessoa.id}`, newPessoa);
  }

  public delete(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
