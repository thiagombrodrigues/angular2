import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CoreService } from '../../services/core/core.service';

import { EspecieAlmoxarifado } from '../../models/almoxarifado/especie-almoxarifado';

/**
 * Servico para manipulação via API REST do módulo de especies de almoxarifado
 * @class services.almoxarifado.EspecieAlmoxarifadoService
*/
@Injectable()
export class EspecieAlmoxarifadoService extends CoreService
{
  constructor(private http:Http)
  {
    super(http, '/almoxarifado/especie-almoxarifado');
  }

  public getEspecies(): Observable<EspecieAlmoxarifado[]>
  {
    return super.all();
  }
}
