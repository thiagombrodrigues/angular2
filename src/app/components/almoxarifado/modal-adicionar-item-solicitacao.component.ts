import { Component, Input, ViewChild, OnInit } from '@angular/core';

import { SolicitacaoAlmoxarifado } from '../../models/almoxarifado/solicitacao-almoxarifado';
import { ItemSolicitacaoAlmoxarifado } from '../../models/almoxarifado/item-solicitacao-almoxarifado';
import { EspecieAlmoxarifado } from '../../models/almoxarifado/especie-almoxarifado';
import { Choice } from '../../models/core/choice';

import { SolicitacaoAlmoxarifadoService } from '../../services/almoxarifado/solicitacao-almoxarifado.service';
import { EspecieAlmoxarifadoService } from '../../services/almoxarifado/especie-almoxarifado.service';

@Component({
    moduleId: module.id,
    selector: 'modal-adicionar-item-solicitacao',
    templateUrl: '/app/templates/almoxarifado/modal-adicionar-item-solicitacao.component.html'
})

/**
 * Componente para gestão do modal de inclusao de itens de solicitacões de almoxarifado
 * @class components.almoxarifado.ModalAdicionarItemSolicitacao
*/
export class ModalAdicionarItemSolicitacao implements OnInit
{
    private item_solicitacao: ItemSolicitacaoAlmoxarifado = new ItemSolicitacaoAlmoxarifado();
    private especies_almoxarifado: EspecieAlmoxarifado[] = [];
    private unidades_medida: Choice[] = [];
    private erros: any = null;

    @Input() model: SolicitacaoAlmoxarifado;

    @ViewChild('modal') modal:any;

    constructor(
        private solicitacao_service: SolicitacaoAlmoxarifadoService,
        private especie_service: EspecieAlmoxarifadoService
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
        this.model.itens_solicitacoes.push(this.item_solicitacao);
        this.item_solicitacao = new ItemSolicitacaoAlmoxarifado();
        this.modal.hide();
    }
}
