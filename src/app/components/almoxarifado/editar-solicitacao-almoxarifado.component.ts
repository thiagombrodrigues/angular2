import { Component, AfterContentInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {BaseSolicitacaoAlmoxarifadoComponent} from './base-solicitacao-almoxarifado.component'

import { SolicitacaoAlmoxarifadoService } from '../../services/almoxarifado/solicitacao-almoxarifado.service';
import { EspecieAlmoxarifadoService } from '../../services/almoxarifado/especie-almoxarifado.service';

import { EventoCompartilhadoService, MensagemEvento } from '../../services/core/evento-compartilhado.service';

@Component({
  moduleId: module.id,
  selector: 'editar-solicitacao-almoxarifado',
  templateUrl: '/app/templates/almoxarifado/formulario-solicitacao-almoxarifado.component.html',
  providers: [ SolicitacaoAlmoxarifadoService, EspecieAlmoxarifadoService ]
})

/**
 * Componente para edição de solicitações de almoxarifado
 * @class components.almoxarifado.EditarSolicitacaoAlmoxarifadoComponent
*/
export class EditarSolicitacaoAlmoxarifadoComponent extends BaseSolicitacaoAlmoxarifadoComponent implements AfterContentInit
{
  private id: number = 0;

  constructor(
    private solicitacao_almoxarifado_service: SolicitacaoAlmoxarifadoService,
    private especie_almoxarifado_service: EspecieAlmoxarifadoService,
    private evento_compartilhado_service: EventoCompartilhadoService,
    private rota_ativa: ActivatedRoute
  )
  {
    super(solicitacao_almoxarifado_service, especie_almoxarifado_service, evento_compartilhado_service);
  }

  ngAfterContentInit()
  {
    this.rota_ativa.params.subscribe((values: {id: number}) => {
      this.id = values.id;
      this.getSolicitacao(this.id);
    });
  }

  public getSolicitacao(id: number): void
  {
    this.erros = null;
    this.solicitacao_almoxarifado_service.getSolicitacao(id).subscribe(
      resposta => {
        this.model = resposta;
        this.titulo_modal = this.model.finalizado? 'Visualizar solicitação' : 'Editar solicitação';
        if(this.justificativa.instance.instanceReady) this.desativarJustificativa(null);
      },
      erros => { this.erros = <any> erros; }
    );
  }

  public salvarSolicitacao(): void
  {
    this.erros = null;
    this.solicitacao_almoxarifado_service.updateSolicitacao(this.model).subscribe(
      resposta => {
        this.evento_compartilhado_service.emitirEventoFilhoPai(new MensagemEvento('UPDATED', '/solicitacao-almoxarifado'));
      },
      erros => {
        this.erros = <any> erros;
      }
    );
  }
}
