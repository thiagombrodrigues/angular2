import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { EspecieAlmoxarifado } from '../../models/almoxarifado/especie-almoxarifado';
import { SolicitacaoAlmoxarifado } from '../../models/almoxarifado/solicitacao-almoxarifado';
import { ItemSolicitacaoAlmoxarifado } from '../../models/almoxarifado/item-solicitacao-almoxarifado';
import { Choice } from '../../models/core/choice';

import { EventoCompartilhadoService, MensagemEvento } from '../../services/core/evento-compartilhado.service';

import { SolicitacaoAlmoxarifadoService } from '../../services/almoxarifado/solicitacao-almoxarifado.service';
import { EspecieAlmoxarifadoService } from '../../services/almoxarifado/especie-almoxarifado.service';

import { ModalDirective } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'editar-solicitacao-almoxarifado',
  templateUrl: '/app/templates/almoxarifado/editar-solicitacao-almoxarifado.component.html',
  providers: [ SolicitacaoAlmoxarifadoService, EspecieAlmoxarifadoService ]
})

/**
 * Componente base para gestão de solicitações de almoxarifado
 * @class components.almoxarifado.BaseSolicitacaoAlmoxarifadoComponent
*/
export class BaseSolicitacaoAlmoxarifadoComponent implements OnInit
{
  public erros: any = null;
  public titulo_modal: string;
  public model: SolicitacaoAlmoxarifado = new SolicitacaoAlmoxarifado();

  private unidades_medida: Choice[] = [];
  private especies_almoxarifado: EspecieAlmoxarifado[] = [];

  @ViewChild('justificativa') justificativa:any;
  @ViewChild('modal_adicionar_item') public modal_adicionar_item:ModalDirective;

  constructor(
    private solicitacao_service: SolicitacaoAlmoxarifadoService,
    private especie_service: EspecieAlmoxarifadoService,
    private evento_compartilhado: EventoCompartilhadoService
  ) { }

  ngOnInit()
  {
      this.solicitacao_service.getChoices().subscribe(
        resposta => { this.unidades_medida = resposta['UNIDADE_MEDIDA_CHOICES']; },
        erros => { this.erros = <any> erros; }
      );

      this.especie_service
            .getEspecies()
            .subscribe(
                resposta => { this.especies_almoxarifado = resposta['results']; },
                erros => { this.erros = erros; }
            );
  }

  public adicionarItemSolicitacaoAlmoxarifado(): void
  {
    this.model.itens_solicitacoes.push(new ItemSolicitacaoAlmoxarifado());
  }

  public selecionarTodosItens(valor: boolean): void
  {
    for(let item of this.model.itens_solicitacoes)
    {
      item.selecionado = valor;
    }
  }

  public removeItensSelecionados(): void
  {
    let remover = this.model.itens_solicitacoes.filter( function(element, index, array) {
      return (element.selecionado == true);
    });

    for(let item of remover)
    {
      let index = this.model.itens_solicitacoes.indexOf(item);
      this.model.itens_solicitacoes.splice(index, 1);
    }
  }

  public cancelarSolicitacao(): void
  {
    this.evento_compartilhado.emitirEventoFilhoPai(new MensagemEvento('CLOSE', '/solicitacao-almoxarifado'));
  }

  public desativarJustificativa(evento: any): void
  {
    this.justificativa.instance.setReadOnly(this.model.finalizado);
  }
}
