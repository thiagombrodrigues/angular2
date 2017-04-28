import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CoreService } from '../../services/core/core.service';

import { SolicitacaoAlmoxarifado } from '../../models/almoxarifado/solicitacao-almoxarifado';

/**
 * Servico para manipulação via API REST do módulo de solicitações de almoxarifado
 * @class services.almoxarifado.SolicitacaoAlmoxarifadoService
*/
@Injectable()
export class SolicitacaoAlmoxarifadoService extends CoreService
{
  constructor(private http:Http)
  {
    super(http, '/almoxarifado/solicitacao-almoxarifado');
  }

  public getSolicitacoes(): Observable<SolicitacaoAlmoxarifado[]>
  {
    return super.all();
  }

  public getSolicitacao(id: number): Observable<SolicitacaoAlmoxarifado>
  {
    return super.get(id);
  }

  public addSolicitacao(instance: SolicitacaoAlmoxarifado): Observable<SolicitacaoAlmoxarifado>
  {
    return super.add(instance);
  }

  public updateSolicitacao(instance: SolicitacaoAlmoxarifado): Observable<SolicitacaoAlmoxarifado>
  {
    return super.update(instance);
  }

  public deleteSolicitacao(instance: SolicitacaoAlmoxarifado): Observable<SolicitacaoAlmoxarifado>
  {
    return super.delete(instance);
  }

  public getChoices(): Observable<any>
  {
    return super.choices();
  }
}
