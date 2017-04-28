import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/**
 * Servico base para manipulação via API REST
 * @class services.core.CoreService
*/
@Injectable()
export class CoreService
{
  private headers = new Headers({'Content-Type': 'application/json'});
  private base_url: string = 'http://10.60.20.17:8000';

  constructor(private core_http: Http, private api_url: String) {}

  public all(): Observable<any[]>
  {
    return this.core_http.get(`${this.base_url}${this.api_url}/`).map(this.extractData).catch(this.handleError);
  }

  public get(id: number): Observable<any>
  {
    return this.core_http.get(`${this.base_url}${this.api_url}/${id}/`).map(this.extractData).catch(this.handleError);
  }

  public add(instance: any): Observable<any>
  {
    return this.core_http.post(`${this.base_url}${this.api_url}/`, JSON.stringify(instance), {headers: this.headers}).map(this.extractData).catch(this.handleError);
  }

  public update(instance: any): Observable<any>
  {
    return this.core_http.put(`${this.base_url}${this.api_url}/${instance.id}/`, JSON.stringify(instance), {headers: this.headers}).map(this.extractData).catch(this.handleError);
  }

  public delete(instance: any): Observable<any>
  {
    return this.core_http.delete(`${this.base_url}${this.api_url}/${instance.id}/`).map(this.extractData).catch(this.handleError);
  }

  public choices(): Observable<any>
  {
    return this.core_http.get(`${this.base_url}${this.api_url}/choices/`).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response)
  {
    return response.json() || {};
  }

  private handleError (error: Response | any): Observable<any>
  {
    return Observable.throw(error);
  }
}
