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

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(this.API);
  }

  public loadById(id: string): Observable<Pessoas> {
    return this.httpClient.get<Pessoas>(`${this.API}/${id}`);
  }

  public saveData(registro: Pessoas): Observable<Pessoas> {
    if(registro.id) {
      return this.update(registro);
    }
    return this.create(registro);
  }

  private create(registro: Partial<Pessoas>): Observable<Pessoas> {
    return this.httpClient.post<Pessoas>(this.API, registro);
  }

  private update(registro: Partial<Pessoas>): Observable<Pessoas> {
    return this.httpClient.put<Pessoas>(`${this.API}/${registro.id}`, registro);
  }

  public delete(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
