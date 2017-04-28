import { Component, OnInit } from '@angular/core';

import { Simulacao } from '../../models/planejamento/simulacao';

import { Consts } from '../../models/core/consts';

var alertify = require('app/static/js/library/alertify.js');

@Component({
    moduleId: module.id,
    selector: 'simulacao',
    templateUrl: '/app/templates/planejamento/simulacao.component.html'
})

/**
 * Componente para gestão dos módulo de simulações
 * @class components.planejamento.SimulacaoComponent
*/
export class SimulacaoComponent implements OnInit
{
    private model: Simulacao = new Simulacao();
    private meses: any[] = Consts.MESES;
    private opcoes_cenarios: Array<any>;
    private opcoes_servidores_impactados: Array<any>;
    private processando_simulacao: boolean;

    constructor()
    {
        this.model.ano_data_limite = new Date().getFullYear();
    }

    ngOnInit()
    {
        this.opcoes_cenarios = [
            {value: '1', label: 'Progressão salarial'},
            {value: '2', label: '13º salário'},
            {value: '3', label: 'Adicional de férias'}
        ];

        this.opcoes_servidores_impactados = [
            {value: '1', label: 'Efetivos'},
            {value: '2', label: 'Comissionados'},
            {value: '3', label: 'Requisitados'},
            {value: '4', label: 'Contratados'},
            {value: '5', label: 'Função de confiança'},
            {value: '6', label: 'Comissionados'},
            {value: '7', label: 'Função eletiva'}
        ];
    }

    public gerarSimulacao(): void
    {
        alertify.log("Simulação concluída!");
    }
}
