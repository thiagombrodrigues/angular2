import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { EventoCompartilhadoService, MensagemEvento } from '../../services/core/evento-compartilhado.service';

import { SolicitacaoAlmoxarifadoService } from '../../services/almoxarifado/solicitacao-almoxarifado.service';

import { SolicitacaoAlmoxarifado } from '../../models/almoxarifado/solicitacao-almoxarifado';

import { Subscription }   from 'rxjs/Subscription';

import { ModalDirective } from 'ngx-bootstrap';

var alertify = require('app/static/js/library/alertify.js');

@Component({
    moduleId: module.id,
    selector: 'solicitacao-almoxarifado',
    templateUrl: '/app/templates/almoxarifado/solicitacao-almoxarifado.component.html',
    providers: [ SolicitacaoAlmoxarifadoService ]
})

/**
 * Componente para gestão dos módulo de solicitacões de almoxarifado
 * @class components.almoxarifado.SolicitacaoAlmoxarifadoComponent
*/
export class SolicitacaoAlmoxarifadoComponent implements OnInit, OnDestroy
{
    erros: any = null;
    aplicacao: string;
    monitor: Subscription;
    solicitacoes_almoxarifado: SolicitacaoAlmoxarifado[];

    @ViewChild('outlet_modal') public outlet_modal:ModalDirective;

    constructor(
        private solicitacao_almoxarifado_service: SolicitacaoAlmoxarifadoService,
        private evento_compartilhado_service: EventoCompartilhadoService,
        private rota: Router
    )
    {
        // Monitora mensagens de broadcast com notificacoes sobre eventos ocorridos
        this.aplicacao = this.rota.url;
        this.monitor = evento_compartilhado_service.evento_filho_pai_emitido$.subscribe(
            (mensagem_evento: MensagemEvento) => {

                // Verifica se o destinatario da notificacao é a atual aplicacao
                if(mensagem_evento.aplicacao == this.aplicacao)
                {
                    switch(mensagem_evento.tipo)
                    {
                        case 'CREATED':
                        {
                            this.getSolicitacoes();
                            this.outlet_modal.hide();
                            alertify.success("Solicitação de almoxarifado realizada com sucesso!");
                            break;
                        }
                        case 'UPDATED':
                        {
                            this.getSolicitacoes();
                            this.outlet_modal.hide();
                            alertify.success("Solicitação de almoxarifado alterada com sucesso!");
                            break;
                        }
                        case 'REFRESH':
                        {
                            this.getSolicitacoes();
                            break;
                        }
                        case 'CLOSE':
                        {
                            this.outlet_modal.hide();
                            break; 
                        }
                        default:
                        { 
                        }
                    }
                }
            }
        );
    }

    ngOnInit()
    {
        this.getSolicitacoes();
    }

    ngOnDestroy()
    {
        this.monitor.unsubscribe();
    }

    public getSolicitacoes(): void
    {
        this.erros = null;
        this.solicitacao_almoxarifado_service
            .getSolicitacoes()
            .subscribe(
                resposta => { this.solicitacoes_almoxarifado = resposta['results']; },
                erros => { this.erros = erros; }
            );
    }

    public excluirSolicitacao(instance: SolicitacaoAlmoxarifado): void
    {
        this.solicitacao_almoxarifado_service
            .deleteSolicitacao(instance)
            .subscribe(
                resposta => {
                    this.getSolicitacoes();
                    alertify.success("Solicitação de almoxarifado excluída com sucesso!");
                },
                erros => {
                    alertify.error("Erro ao excluir solicitação de almoxarifado!");
                }
            );
    }
}
