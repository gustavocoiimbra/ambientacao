import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of,  } from 'rxjs';
import { Pessoas } from 'src/app/models/pessoa.interface';
import { ConsultaAPIService } from 'src/app/services/consulta-api.service';

@Injectable({
  providedIn: 'root'
})
export class PessoasResolver implements Resolve<Pessoas> {

  constructor(private service: ConsultaAPIService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pessoas> {
   if(route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: '', cpf: '', name: ''});
  }
}
