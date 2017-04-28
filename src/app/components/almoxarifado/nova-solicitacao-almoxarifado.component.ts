import { Component } from '@angular/core';

import {BaseSolicitacaoAlmoxarifadoComponent} from './base-solicitacao-almoxarifado.component'

import { SolicitacaoAlmoxarifado } from '../../models/almoxarifado/solicitacao-almoxarifado';
import { SolicitacaoAlmoxarifadoService } from '../../services/almoxarifado/solicitacao-almoxarifado.service';
import { EspecieAlmoxarifadoService } from '../../services/almoxarifado/especie-almoxarifado.service';

import { EventoCompartilhadoService, MensagemEvento } from '../../services/core/evento-compartilhado.service';

@Component({
    moduleId: module.id,
    selector: 'nova-solicitacao-almoxarifado',
    templateUrl: '/app/templates/almoxarifado/formulario-solicitacao-almoxarifado.component.html',
    providers: [ SolicitacaoAlmoxarifadoService, EspecieAlmoxarifadoService ]
})

/**
 * Componente para criação de solicitações de almoxarifado
 * @class components.almoxarifado.NovaSolicitacaoAlmoxarifadoComponent
*/
export class NovaSolicitacaoAlmoxarifadoComponent extends BaseSolicitacaoAlmoxarifadoComponent
{
    constructor(
        private solicitacao_almoxarifado_service: SolicitacaoAlmoxarifadoService,
        private especie_almoxarifado_service: EspecieAlmoxarifadoService,
        private evento_compartilhado_service: EventoCompartilhadoService
    )
    {
        super(solicitacao_almoxarifado_service, especie_almoxarifado_service, evento_compartilhado_service);
        this.titulo_modal = 'Nova solicitação';
    }

    /**
     * Método para salvar solicitações de almoxarifado.
     * @method salvarSolicitacao
    */
    public salvarSolicitacao(): void
    {
        this.erros = null;
        this.solicitacao_almoxarifado_service.addSolicitacao(this.model).subscribe(
          resposta => {
            this.evento_compartilhado_service.emitirEventoFilhoPai(new MensagemEvento('CREATED', '/solicitacao-almoxarifado'));
            this.model = new SolicitacaoAlmoxarifado(); // Cria uma nova instancia do model para limpar referencias
          },
          erros => {
            this.erros = <any> erros;
          }
        );
    }
}
