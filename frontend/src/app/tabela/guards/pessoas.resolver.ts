import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Users } from 'src/app/models/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class PessoasResolver implements Resolve<Users> {

  constructor(private service: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Users> {
    if(route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: '', name: '', cpf: ''});
  }
}
