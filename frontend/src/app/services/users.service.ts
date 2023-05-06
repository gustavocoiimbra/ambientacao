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

}
