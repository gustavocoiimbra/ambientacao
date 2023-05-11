import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Users } from 'src/app/models/users.interface';
import { ConsultaAPIService } from 'src/app/services/consulta-api.service';

@Injectable({
  providedIn: 'root'
})
export class PessoasResolver implements Resolve<Users> {

  constructor(private service: ConsultaAPIService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Users> {
    if(route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: '', name: '', cpf: ''});
  }
}
