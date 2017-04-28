import { ItemSolicitacaoAlmoxarifado } from './item-solicitacao-almoxarifado';

export class SolicitacaoAlmoxarifado
{
    public id: number;
    public servidor: string;
    public atendente: string;
    public data_solicitacao: Date;
    public data_resposta: Date;
    public justificativa: string;
    public resposta: string;
    public status: number;
    public data_finalizado: Date;
    public itens_solicitacoes: ItemSolicitacaoAlmoxarifado[] = [];
    public finalizado: boolean;

    constructor()
    {
        this.finalizado = false;
    }
}
