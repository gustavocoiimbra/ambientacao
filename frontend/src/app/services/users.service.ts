import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = "/api/pessoas";

  constructor(private httpClient: HttpClient) { }

  public getUsers() {
    return this.httpClient.get<Users[]>(this.API)
  }

  public loadById(id: string) {
    return this.httpClient.get<Users>(`${this.API}/${id}`);
  }

  public saveData(newPessoa: Users) {
    console.log(newPessoa.id)
    if(newPessoa.id) {
      console.log("Update")
      return this.update(newPessoa);
    }
    console.log("Create")
    return this.create(newPessoa);
  }

  private create(newPessoa: Partial<Users>) {
    console.log(newPessoa)
    return this.httpClient.post<Users>(this.API, newPessoa);
  }

  private update(newPessoa: Partial<Users>) {
    return this.httpClient.put<Users>(`${this.API}/${newPessoa.id}`, newPessoa);
  }
}
